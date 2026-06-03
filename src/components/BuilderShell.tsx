import React, { useState, useRef, useEffect } from "react";
import { 
  User, Image as ImageIcon, Briefcase, Layout, Palette, CheckSquare, 
  Sparkles, ArrowRight, ArrowLeft, Plus, Trash2, Upload, AlertCircle, 
  ChevronUp, ChevronDown, Check, HelpCircle, Instagram, Youtube, Facebook, MapPin,
  Globe, Lock, Unlock, ExternalLink, Copy, Save, LogOut, Loader2
} from "lucide-react";
import { LandingPageConfig, PortfolioItem, ServiceItem, TemplateId } from "../types";
import { PALETTES, getAISuggestions } from "../data/defaults";
import { auth, db, loginWithGoogle, logoutUser } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

interface BuilderShellProps {
  config: LandingPageConfig;
  onChange: (newConfig: LandingPageConfig) => void;
  onGenerate: () => void;
}

export default function BuilderShell({ config, onChange, onGenerate }: BuilderShellProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Creator Cloud Database State Tracking
  const [user, setUser] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const [publishMessage, setPublishMessage] = useState<string>("");
  const [publishUrl, setPublishUrl] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserProjects(currentUser.uid);
      } else {
        setUserProjects([]);
        setPublishUrl("");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProjects = async (uid: string) => {
    setIsLoadingProjects(true);
    try {
      const q = query(collection(db, "projects"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const docsList: any[] = [];
      querySnapshot.forEach((doc) => {
        docsList.push({ id: doc.id, ...doc.data() });
      });
      setUserProjects(docsList);
    } catch (err) {
      console.error("Error fetching user projects:", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!user) {
      alert("Please sign in to save your designs.");
      return;
    }
    setIsSaving(true);
    setPublishMessage("");
    try {
      const studioSlug = config.identity.studioName.trim().toLowerCase().replace(/[^a-z0-9]/g, "-") || "stills";
      let targetProjectId = "";
      const existingProject = userProjects.find(p => p.studioName === config.identity.studioName);
      if (existingProject) {
        targetProjectId = existingProject.id;
      } else {
        targetProjectId = `${studioSlug}-${Math.random().toString(36).substring(2, 8)}`;
      }

      const payload: any = {
        id: targetProjectId,
        userId: user.uid,
        studioName: config.identity.studioName,
        config: config,
        isPublished: true,
        updatedAt: serverTimestamp()
      };

      if (!existingProject) {
        payload.createdAt = serverTimestamp();
        await setDoc(doc(db, "projects", targetProjectId), payload);
      } else {
        payload.createdAt = existingProject.createdAt;
        await setDoc(doc(db, "projects", targetProjectId), payload);
      }

      const liveLink = `${window.location.origin}/?project=${targetProjectId}`;
      setPublishUrl(liveLink);
      setPublishMessage("Portal published successfully!");
      fetchUserProjects(user.uid);
    } catch (err: any) {
      console.error("Failed to publish project:", err);
      alert("Failed to save and publish project. " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this saved project? This action is permanent.")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      fetchUserProjects(user.uid);
      if (publishUrl.includes(id)) {
        setPublishUrl("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  const handleLoadProject = (proj: any) => {
    if (confirm(`Load project design "${proj.studioName}" into the active editor? This will overwrite your current configurations.`)) {
      onChange(proj.config);
      setCurrentStep(1); // take them back to first step
    }
  };

  const updateSEO = (fields: Partial<NonNullable<LandingPageConfig["seo"]>>) => {
    onChange({
      ...config,
      seo: {
        pageTitle: config.seo?.pageTitle || "",
        metaDescription: config.seo?.metaDescription || "",
        googleAnalyticsId: config.seo?.googleAnalyticsId || "",
        ...fields
      }
    });
  };

  const steps = [
    { num: 1, label: "Identity", icon: User },
    { num: 2, label: "Portfolio", icon: ImageIcon },
    { num: 3, label: "Services", icon: Briefcase },
    { num: 4, label: "Layout", icon: Layout },
    { num: 5, label: "Colors", icon: Palette },
    { num: 6, label: "Sections", icon: CheckSquare },
    { num: 7, label: "Review", icon: Sparkles }
  ];

  // Helper: Update a nested state branch
  const updateIdentity = (fields: Partial<LandingPageConfig["identity"]>) => {
    onChange({
      ...config,
      identity: { ...config.identity, ...fields }
    });
  };

  const updateSocials = (fields: Partial<LandingPageConfig["identity"]["socials"]>) => {
    onChange({
      ...config,
      identity: {
        ...config.identity,
        socials: { ...config.identity.socials, ...fields }
      }
    });
  };

  const updateSections = (fields: Partial<LandingPageConfig["sections"]>) => {
    onChange({
      ...config,
      sections: { ...config.sections, ...fields }
    });
  };

  // Portfolio actions
  const handlePortfolioUpload = (file: File) => {
    if (config.portfolio.length >= 12) {
      alert("You can upload a maximum of 12 portfolio items.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      const newItem: PortfolioItem = {
        id: "p_" + Date.now() + Math.random().toString(36).substr(2, 4),
        url: base64data,
        title: "Untitled Project",
        description: "Bespoke media frame details.",
        category: "Wedding",
        type: file.type.startsWith("video") ? "video" : "image"
      };
      onChange({
        ...config,
        portfolio: [...config.portfolio, newItem]
      });
    };
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files).forEach((file: any) => {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          handlePortfolioUpload(file);
        }
      });
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files).forEach((file: any) => {
        handlePortfolioUpload(file);
      });
    }
  };

  const removePortfolioItem = (id: string) => {
    onChange({
      ...config,
      portfolio: config.portfolio.filter(item => item.id !== id)
    });
  };

  const updatePortfolioItem = (id: string, fields: Partial<PortfolioItem>) => {
    onChange({
      ...config,
      portfolio: config.portfolio.map(item => item.id === id ? { ...item, ...fields } : item)
    });
  };

  const movePortfolioItem = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= config.portfolio.length) return;
    
    const rearranged = [...config.portfolio];
    const temp = rearranged[index];
    rearranged[index] = rearranged[nextIndex];
    rearranged[nextIndex] = temp;

    onChange({
      ...config,
      portfolio: rearranged
    });
  };

  // Services actions
  const addService = () => {
    if (config.services.length >= 6) {
      alert("You can add a maximum of 6 service packages.");
      return;
    }
    const newService: ServiceItem = {
      id: "s_" + Date.now(),
      name: "New Service Package",
      description: "Describe the scope and creative value of this package offering.",
      deliverables: ["High-res digital archives", "Directing support"],
      turnaround: "2 Weeks",
      price: "1,500",
      requestQuote: false
    };
    onChange({
      ...config,
      services: [...config.services, newService]
    });
  };

  const removeService = (id: string) => {
    onChange({
      ...config,
      services: config.services.filter(s => s.id !== id)
    });
  };

  const updateService = (id: string, fields: Partial<ServiceItem>) => {
    onChange({
      ...config,
      services: config.services.map(s => s.id === id ? { ...s, ...fields } : s)
    });
  };

  // Get AI recommendations
  const aiRecs = getAISuggestions(config.identity.profession, config.templateId);

  return (
    <div className="bg-[#F5F0EA] text-[#1A1108] min-h-screen flex flex-col font-sans select-none antialiased">
      {/* Global Sleek Thin Progress Tracker */}
      <div className="h-1 w-full bg-[#1a1108]/5 shrink-0">
        <div 
          className="h-full bg-[#905C37] transition-all duration-500 ease-out" 
          style={{ width: `${(currentStep / 7) * 100}%` }}
        ></div>
      </div>

      {/* Header element */}
      <header className="w-full border-b border-[#1a1108]/10 px-6 md:px-12 py-4 flex items-center justify-between shrink-0 bg-[#F5F0EA]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#905C37] rounded-sm flex items-center justify-center text-[#F5F0EA] font-serif font-black text-xl italic select-none">
            F
          </div>
          <div>
            <span className="text-xl font-serif italic tracking-tight text-[#1a1108]">Framr.</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#905C37] ml-2.5 hidden sm:inline border-l border-[#1a1108]/15 pl-2.5">Editorial Web Studio</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono uppercase text-[#1a1108]/60">
          <div className="hidden lg:flex items-center gap-2">
            <span className="opacity-50">Project:</span>
            <span className="font-bold underline underline-offset-4 text-[#1a1108] tracking-widest">{config.identity.studioName || "Elena Vance • 2024 Portfolio"}</span>
          </div>
          <button
            onClick={onGenerate}
            className="px-4 py-1.5 border border-[#1a1108] text-[10px] tracking-widest font-bold font-sans uppercase hover:bg-[#1a1108] hover:text-[#F5F0EA] transition-colors cursor-pointer"
          >
            Live Preview
          </button>
        </div>
      </header>

      {/* Responsive Workspace Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8 overflow-hidden">
        {/* SIDEBAR NAVIGATION: Editorial progress sidebar */}
        <aside className="w-64 border-r border-[#1a1108]/10 pr-8 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#905C37] font-bold block mb-4">Wizard Progress Overview</span>
            <div className="flex flex-col gap-4">
              {steps.map(step => {
                const isActive = step.num === currentStep;
                const isCompleted = step.num < currentStep;

                return (
                  <button
                    key={step.num}
                    onClick={() => isCompleted && setCurrentStep(step.num)}
                    disabled={!isCompleted && step.num > currentStep}
                    className={`flex items-center gap-4 text-left transition-all group ${
                      isActive
                        ? "text-[#1a1108] translate-x-1"
                        : isCompleted
                        ? "text-[#1a1108]/80 cursor-pointer hover:translate-x-1"
                        : "text-[#1a1108]/30 cursor-not-allowed"
                    }`}
                  >
                    <span className={`font-serif italic text-lg transition-colors ${isActive ? "text-[#905C37]" : "text-[#1a1108]/30 group-hover:text-[#905C37]"}`}>
                      0{step.num}
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${isActive ? "font-black text-[#905C37]" : isCompleted ? "font-bold text-[#1a1108]/80 group-hover:text-[#905C37]" : "text-[#1a1108]/30"}`}>
                        {step.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Elegant Suggestion Widget */}
          <div className="p-4 bg-[#905C37]/5 border border-[#905C37]/15 rounded-sm select-none">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#905C37] font-bold">AI SWATCH SUGGESTION</span>
            </div>
            <p className="text-xs leading-relaxed text-[#1a1108]/70">
              Based on your focus as a <span className="font-semibold text-[#1a1108]">{config.identity.profession === "both" ? "Photographer & Film Specialist" : config.identity.profession === "videographer" ? "Videographer" : "Photographer"}</span>, we highly recommend trying the <strong className="font-serif capitalize italic text-[#905C37]">{config.identity.profession === "videographer" ? "Obsidian" : "Luminary"}</strong> template layouts.
            </p>
          </div>
        </aside>

        {/* MOBILE COMPACT TOPNAV TRACKER */}
        <div className="md:hidden flex items-center justify-between border-b border-[#1a1108]/10 pb-4 shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1a1108]/60">Step {currentStep} of 07</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-serif italic font-bold">Active:</span>
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#905C37]">{steps[currentStep - 1].label}</span>
          </div>
        </div>

        {/* Main Workspace Frame */}
        <main className="flex-grow flex flex-col justify-between overflow-y-auto">
          <div className="bg-[#FAF7F2] border border-[#1a1108]/10 rounded-none p-5 md:p-8 flex-1 min-h-[450px]">
          
          {/* STEP 1: IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif italic text-[#1a1108] leading-tight">Tell us about your Studio</h2>
                <p className="text-xs text-stone-500 mt-1">Configure your primary artist identity and secure messaging contacts.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Studio/Photographer Name</label>
                  <input
                    type="text"
                    value={config.identity.studioName}
                    onChange={(e) => updateIdentity({ studioName: e.target.value })}
                    className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                    placeholder="E.g. James Vance Stills"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Profession Focus</label>
                  <select
                    value={config.identity.profession}
                    onChange={(e) => updateIdentity({ profession: e.target.value as any })}
                    className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                  >
                    <option value="photographer">Photographer</option>
                    <option value="videographer">Videographer</option>
                    <option value="both">Both (Photography & Film)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Studio Tagline (One-Liner)</label>
                <input
                  type="text"
                  value={config.identity.tagline}
                  onChange={(e) => updateIdentity({ tagline: e.target.value })}
                  className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                  placeholder="E.g. Slowing down time to capture honest grain stories."
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Tell Your Narrative (Short Bio)</label>
                <textarea
                  rows={4}
                  value={config.identity.bio}
                  onChange={(e) => updateIdentity({ bio: e.target.value })}
                  className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] leading-relaxed transition-all"
                  placeholder="Hi, I am James. An editorial designer specialized in natural light exposures and scenic landscape wedding features..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-[#1a1108]/10">
                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Studio HQ / Location</label>
                  <input
                    type="text"
                    value={config.identity.location}
                    onChange={(e) => updateIdentity({ location: e.target.value })}
                    className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                    placeholder="Portland, OR / Worldwide"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Booking Email</label>
                  <input
                    type="email"
                    value={config.identity.email}
                    onChange={(e) => updateIdentity({ email: e.target.value })}
                    className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                    placeholder="contact@studio.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase opacity-85 mb-2 font-bold text-[#1a1108]">Phone Number (Optional)</label>
                  <input
                    type="text"
                    value={config.identity.phone || ""}
                    onChange={(e) => updateIdentity({ phone: e.target.value })}
                    className="w-full p-3 border border-[#1a1108]/15 rounded-none bg-white/60 text-sm focus:outline-none focus:border-[#905C37] transition-all"
                    placeholder="+1 (555) 012-3456"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#1a1108]/10">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#905C37] font-mono">Social Media Indexes</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 bg-white/60 rounded-none border border-[#1a1108]/15 px-3">
                    <Instagram size={15} className="text-stone-400" />
                    <input
                      type="text"
                      value={config.identity.socials.instagram || ""}
                      onChange={(e) => updateSocials({ instagram: e.target.value })}
                      placeholder="Instagram URL"
                      className="w-full py-3 text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 rounded-none border border-[#1a1108]/15 px-3">
                    <Youtube size={15} className="text-stone-400" />
                    <input
                      type="text"
                      value={config.identity.socials.youtube || ""}
                      onChange={(e) => updateSocials({ youtube: e.target.value })}
                      placeholder="YouTube Channel URL"
                      className="w-full py-3 text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PORTFOLIO UPLOAD ZONE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Portfolio Media Journal</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Upload raw files or analog film strips (Maximum 12 items). Arrange them below or add details.
                </p>
              </div>

              {/* Upload Drag Area */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-[#905C37] bg-[#905C37]/5"
                    : "border-[#E3DACF] bg-[#EAE3DB]/30 hover:bg-[#EAE3DB]/50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleManualUpload}
                  className="hidden"
                  accept="image/*,video/*"
                  multiple
                />
                <div className="bg-[#FAF7F2] p-4 rounded-full shadow-sm mb-4 text-[#905C37]">
                  <Upload size={24} />
                </div>
                <p className="font-bold text-sm">Drag and drop media frames here</p>
                <p className="text-xs text-stone-400 mt-1">Accepts images (JPG, PNG, WEBP) & videos. Or click to select files.</p>
                <p className="text-[10px] font-mono text-[#905C37] mt-3 uppercase tracking-widest bg-white py-1 px-3.5 rounded-full shadow-xs">
                  CURRENT LOAD: {config.portfolio.length} / 12 SLOTS
                </p>
              </div>

              {/* Portfolio Grid List */}
              {config.portfolio.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#905C37]">Reorder & Customize Items</h3>
                  <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-1">
                    {config.portfolio.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex flex-col md:flex-row gap-4 items-stretch md:items-center relative hover:shadow-xs transition-shadow"
                      >
                        {/* Thumbnail View */}
                        <div className="w-full md:w-24 h-24 shrink-0 rounded-xl overflow-hidden relative border border-stone-100 bg-stone-100">
                          {item.type === "video" ? (
                            <div className="absolute inset-0 bg-[#121212] flex items-center justify-center text-[10px] text-white font-mono uppercase bg-opacity-70">
                              Video
                            </div>
                          ) : (
                            <img src={item.url} alt="Folio thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>

                        {/* Metadata inputs */}
                        <div className="flex-grow grid sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-mono uppercase opacity-60 block mb-1">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updatePortfolioItem(item.id, { title: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-[#E3DACF] rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase opacity-60 block mb-1">Category</label>
                            <select
                              value={item.category}
                              onChange={(e) => updatePortfolioItem(item.id, { category: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-[#E3DACF] rounded-lg text-xs"
                            >
                              <option value="Wedding">Wedding</option>
                              <option value="Portrait">Portrait</option>
                              <option value="Commercial">Commercial</option>
                              <option value="Prenup">Prenup</option>
                              <option value="Event">Event</option>
                              <option value="Documentary">Documentary</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase opacity-60 block mb-1">Short Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updatePortfolioItem(item.id, { description: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-[#E3DACF] rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        {/* Reordering / Delete column */}
                        <div className="flex md:flex-col justify-end gap-1 shrink-0 px-2">
                          <button
                            onClick={() => movePortfolioItem(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-stone-500 hover:text-[#905C37] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => movePortfolioItem(index, "down")}
                            disabled={index === config.portfolio.length - 1}
                            className="p-1 text-stone-500 hover:text-[#905C37] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <button
                            onClick={() => removePortfolioItem(item.id)}
                            className="p-1 text-red-600 hover:text-red-700 md:mt-2"
                            title="Delete Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SERVICES */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Service Packages & Tariffs</h2>
                  <p className="text-xs text-stone-500 mt-1">Assemble up to 6 custom studio packages. Display turnaround or quotas.</p>
                </div>
                <button
                  onClick={addService}
                  disabled={config.services.length >= 6}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#905C37] text-white text-xs font-bold uppercase rounded-xl hover:opacity-90 disabled:opacity-40 shrink-0"
                >
                  <Plus size={14} /> Add Package
                </button>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {config.services.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl border-2 border-dashed border-[#E3DACF] antialiased">
                    <span className="text-xs text-stone-400 font-mono text-center">NO CREATIVE SERVICE PACKAGES CREATED</span>
                    <p className="text-[11px] text-stone-400 mt-1">Press 'Add Package' to generate customized contract plans.</p>
                  </div>
                ) : (
                  config.services.map((service, idx) => (
                    <div
                      key={service.id}
                      className="p-5 border border-[#E3DACF] rounded-2xl bg-white shadow-xs relative flex flex-col gap-4"
                    >
                      {/* Top Bar for numbering and removal */}
                      <div className="flex justify-between items-center pb-3 border-b border-[#FAF6F0]">
                        <span className="text-[10px] font-mono bg-[#EAE3DB] text-[#1A1108]/70 px-2.5 py-1 rounded-md uppercase">
                          Package Entry #0{idx + 1}
                        </span>
                        <button
                          onClick={() => removeService(service.id)}
                          className="text-red-500 hover:text-red-600 flex items-center gap-1 font-mono text-[10px] uppercase font-bold"
                        >
                          <Trash2 size={14} /> Remove Card
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono uppercase opacity-70 block mb-1 font-bold">Service Package Name</label>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => updateService(service.id, { name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl font-sans text-xs"
                            placeholder="E.g. Intimate Story Session"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase opacity-70 block mb-1 font-bold">Turnaround Timeline</label>
                          <input
                            type="text"
                            value={service.turnaround}
                            onChange={(e) => updateService(service.id, { turnaround: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl font-sans text-xs"
                            placeholder="E.g. 3 Weeks"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase opacity-70 block mb-1 font-bold">Scope Description</label>
                        <textarea
                          rows={2}
                          value={service.description}
                          onChange={(e) => updateService(service.id, { description: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl font-sans text-xs leading-relaxed"
                          placeholder="Describe deliverables layout and shooting location rules..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 items-center bg-[#FAF7F2] p-3 rounded-xl border border-stone-100">
                        <div>
                          <label className="text-[10px] font-mono uppercase opacity-70 block mb-1 font-bold">Estimated Starting Price ($)</label>
                          <input
                            type="text"
                            disabled={service.requestQuote}
                            value={service.price || ""}
                            onChange={(e) => updateService(service.id, { price: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl font-sans text-xs disabled:bg-stone-100 disabled:opacity-40"
                            placeholder="E.g. 1,600"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <input
                            type="checkbox"
                            id={`quote-${service.id}`}
                            checked={service.requestQuote}
                            onChange={(e) => updateService(service.id, { requestQuote: e.target.checked })}
                            className="rounded h-4 w-4 border-[#E3DACF] text-[#905C37] focus:ring-[#905C37]"
                          />
                          <label htmlFor={`quote-${service.id}`} className="text-xs font-bold select-none cursor-pointer">
                            Always Require "Proposal Quote"
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase opacity-70 block mb-1 font-bold">
                          Bullet Deliverables (Comma-separated list)
                        </label>
                        <input
                          type="text"
                          value={service.deliverables.join(", ")}
                          onChange={(e) => updateService(service.id, { deliverables: e.target.value.split(",").map(part => part.trim()).filter(Boolean) })}
                          className="w-full px-3 py-2 border rounded-xl font-sans text-xs"
                          placeholder="E.g. 60+ edited pictures, styling layout book, custom gallery access"
                        />
                        <span className="text-[9px] text-stone-400 mt-1 block">Separate every bullet detail with a comma.</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 4: LAYOUT SELECTION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Aesthetic Layout Templates</h2>
                <p className="text-xs text-stone-500 mt-1">Select one of our 4 custom-crafted frameworks to present your visual media.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pb-2">
                
                {/* Template 1 — Luminary */}
                <button
                  onClick={() => onChange({ ...config, templateId: "luminary" })}
                  className={`border-2 rounded-2xl p-5 text-left transition-all flex flex-col justify-between h-72 ${
                    config.templateId === "luminary"
                      ? "border-[#905C37] bg-[#905C37]/5 shadow-sm scale-[1.01]"
                      : "border-[#E3DACF] bg-white hover:border-[#905C37]/50"
                  }`}
                >
                  <div>
                    {/* Visual Mock Thumbnail */}
                    <div className="h-28 w-full bg-stone-100 rounded-xl mb-4 border flex items-center justify-center p-3 relative overflow-hidden">
                      <div className="absolute inset-x-0 top-3 px-3 flex justify-between text-[6px] font-serif border-b pb-1 opacity-50">
                        <span>STUDIO</span>
                        <span>[GALLERY JOURNAL]</span>
                      </div>
                      <div className="text-center font-serif py-4">
                        <span className="text-[14px] font-light leading-none tracking-widest block uppercase">LUMINARY</span>
                        <span className="text-[6px] italic opacity-60">asymmetric media journal</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm tracking-tight">Template 1 — Luminary</h3>
                    <p className="text-[11px] text-stone-500 mt-1">Fullscreen hero showcase with fine asymmetric masonry layouts and elegant serif typography. Best for romantic visual works.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#EAE3DB] py-0.5 px-2 rounded-md font-bold self-end text-[#1A1108]/60">FINE ART & PORTRAIT</span>
                </button>

                {/* Template 2 — Chronicle */}
                <button
                  onClick={() => onChange({ ...config, templateId: "chronicle" })}
                  className={`border-2 rounded-2xl p-5 text-left transition-all flex flex-col justify-between h-72 ${
                    config.templateId === "chronicle"
                      ? "border-[#905C37] bg-[#905C37]/5 shadow-sm scale-[1.01]"
                      : "border-[#E3DACF] bg-white hover:border-[#905C37]/50"
                  }`}
                >
                  <div>
                    {/* Visual Mock Thumbnail */}
                    <div className="h-28 w-full bg-stone-100 rounded-xl mb-4 border flex items-center justify-center p-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#EAE3DB]/40 p-3 flex flex-col justify-between">
                        <div className="border-b border-black/10 pb-1 flex justify-between text-[6px] font-mono tracking-widest">
                          <span>VOL-01</span>
                          <span>CHRONICLE</span>
                        </div>
                        <div className="text-center">
                          <span className="text-lg font-black tracking-tighter uppercase font-sans leading-none block">THE CHRONICLE</span>
                          <span className="text-[6px] font-serif italic block mt-0.5">vintage print editorial style</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm tracking-tight">Template 2 — Chronicle</h3>
                    <p className="text-[11px] text-stone-500 mt-1">Bold magazine layouts with massive typography statements, structural catalog tables, and retro print grids. High character representation.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#EAE3DB] py-0.5 px-2 rounded-md font-bold self-end text-[#1A1108]/60">EDITORIAL & DOCUMENTARY</span>
                </button>

                {/* Template 3 — Obsidian */}
                <button
                  onClick={() => onChange({ ...config, templateId: "obsidian" })}
                  className={`border-2 rounded-2xl p-5 text-left transition-all flex flex-col justify-between h-72 ${
                    config.templateId === "obsidian"
                      ? "border-[#905C37] bg-[#905C37]/5 shadow-sm scale-[1.01]"
                      : "border-[#E3DACF] bg-white hover:border-[#905C37]/50"
                  }`}
                >
                  <div>
                    {/* Visual Mock Thumbnail */}
                    <div className="h-28 w-full bg-neutral-900 text-stone-200 rounded-xl mb-4 border border-stone-800 flex items-center justify-center p-3 relative overflow-hidden">
                      <div className="text-center font-sans">
                        <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#C5A880] block">OBSIDIAN</span>
                        <div className="inline-block h-0.5 w-6 bg-amber-500 mt-1"></div>
                        <span className="text-[6px] font-mono uppercase block mt-1 tracking-widest text-[#A0A0A0]">cinematic system still</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm tracking-tight">Template 3 — Obsidian</h3>
                    <p className="text-[11px] text-stone-500 mt-1">Ultra-premium luxury darkroom aesthetic, featuring glowing accent boundaries, overlay zoom cards, and high-density cinematic grids.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#EAE3DB] py-0.5 px-2 rounded-md font-bold self-end text-[#1A1108]/60">FILM & LUXURY COMMISSIONS</span>
                </button>

                {/* Template 4 — Arcadia */}
                <button
                  onClick={() => onChange({ ...config, templateId: "arcadia" })}
                  className={`border-2 rounded-2xl p-5 text-left transition-all flex flex-col justify-between h-72 ${
                    config.templateId === "arcadia"
                      ? "border-[#905C37] bg-[#905C37]/5 shadow-sm scale-[1.01]"
                      : "border-[#E3DACF] bg-white hover:border-[#905C37]/50"
                  }`}
                >
                  <div>
                    {/* Visual Mock Thumbnail */}
                    <div className="h-28 w-full bg-amber-50/10 rounded-xl mb-4 border flex items-center justify-center p-3 relative overflow-hidden">
                      <div className="absolute top-2 left-3 flex gap-0.5 text-[#905C37]">
                        <span className="text-[6px]">❤</span>
                        <span className="text-[5px] font-bold">arcadia</span>
                      </div>
                      <div className="w-1/2 aspect-square rounded-full border-t border-[#905C37]/25 absolute -right-2 -bottom-2"></div>
                      <div className="text-center font-sans">
                        <span className="text-[14px] font-bold uppercase tracking-tighter text-[#1A1108] block">Arcadia Grid</span>
                        <span className="text-[6px] block opacity-60">approachable, split-screen catalog layout</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm tracking-tight">Template 4 — Arcadia</h3>
                    <p className="text-[11px] text-stone-500 mt-1">Sleek grid dividers with a highly elegant split-screen greeting frame, card outlines, and checking tables. Friendly, modern and warmth-focused.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#EAE3DB] py-0.5 px-2 rounded-md font-bold self-end text-[#1A1108]/60">CREATIVE PORTFOLIO</span>
                </button>

              </div>
            </div>
          )}

          {/* STEP 5: COLOR PALETTE */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Color Palette Studio</h2>
                <p className="text-xs text-stone-500 mt-1">Choose between the curated presets or use custom select pickers to construct your own style.</p>
              </div>

              {/* Toggle presets vs custom */}
              <div className="flex gap-2 p-1 bg-[#EAE3DB]/50 rounded-xl w-fit">
                <button
                  onClick={() => onChange({ ...config, paletteType: "preset" })}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
                    config.paletteType === "preset"
                      ? "bg-white text-[#1a1108] shadow-xs"
                      : "text-stone-500 hover:text-[#1a1108]"
                  }`}
                >
                  Curated Presets
                </button>
                <button
                  onClick={() => onChange({ ...config, paletteType: "custom" })}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
                    config.paletteType === "custom"
                      ? "bg-white text-[#1a1108] shadow-xs"
                      : "text-stone-500 hover:text-[#1a1108]"
                  }`}
                >
                  Build Custom Swatch
                </button>
              </div>

              {/* CURATED PRESETS */}
              {config.paletteType === "preset" ? (
                <div className="space-y-6">
                  {/* AI Palette suggestion notice based on template & profession */}
                  {aiRecs.length > 0 && (
                    <div className="p-4 bg-[#905C37]/5 border border-[#905C37]/20 rounded-2xl flex gap-3 items-start select-none">
                      <Sparkles size={18} className="text-[#905C37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold block uppercase tracking-wider text-[#905C37]">AI Studio Swatch Suggestions</span>
                        <div className="space-y-2 mt-2">
                          {aiRecs.map((rec) => {
                            const palette = PALETTES[rec.id];
                            if (!palette) return null;
                            return (
                              <div key={rec.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2 bg-white rounded-xl border border-[#E3DACF]">
                                <div className="flex items-center gap-2">
                                  <div className="flex shrink-0">
                                    <div className="w-3 h-3 rounded-l-full border" style={{ backgroundColor: palette.background }}></div>
                                    <div className="w-3 h-3 border-y" style={{ backgroundColor: palette.text }}></div>
                                    <div className="w-3 h-3 rounded-r-full border" style={{ backgroundColor: palette.accent }}></div>
                                  </div>
                                  <span className="text-xs font-bold">{palette.name}</span>
                                  <span className="text-[10px] text-stone-400 italic font-medium leading-none"> - {rec.reason}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onChange({ ...config, presetPaletteId: rec.id })}
                                  className="text-[10px] uppercase font-bold text-[#905C37] hover:underline shrink-0"
                                >
                                  Apply Swatch
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(PALETTES).map(([id, item]) => {
                      const isSelected = config.presetPaletteId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => onChange({ ...config, presetPaletteId: id })}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all ${
                            isSelected
                              ? "border-[#905C37] bg-white shadow-xs scale-[1.02]"
                              : "border-[#E3DACF] bg-white hover:border-[#905C37]/50"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{item.name}</span>
                            <span className="text-[9px] text-[#1A1108]/40 uppercase font-mono">{item.isDark ? "Dark theme" : "Light theme"}</span>
                          </div>

                          <div className="flex gap-1.5 items-center mt-4">
                            <span className="block text-[9px] uppercase font-mono opacity-60">Palette:</span>
                            <div className="flex">
                              <div className="w-4 h-4 rounded-full border-2 border-white -mr-1" style={{ backgroundColor: item.background, zIndex: 3 }} title="Background"></div>
                              <div className="w-4 h-4 rounded-full border-2 border-white -mr-1" style={{ backgroundColor: item.text, zIndex: 2 }} title="Text"></div>
                              <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: item.accent, zIndex: 1 }} title="Accent"></div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* CUSTOM PALETTE PICKERS */
                <div className="grid md:grid-cols-2 gap-8 bg-white p-6 border border-[#E3DACF] rounded-2xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1 font-mono">1. Primary Background</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={config.customPalette.background}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, background: e.target.value } })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.customPalette.background}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, background: e.target.value } })}
                          className="px-3 py-1.5 border rounded-lg text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1 font-mono">2. Text / Headlines Color</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={config.customPalette.text}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, text: e.target.value } })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.customPalette.text}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, text: e.target.value } })}
                          className="px-3 py-1.5 border rounded-lg text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1 font-mono">3. Primary Accent / Details</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={config.customPalette.accent}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, accent: e.target.value } })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.customPalette.accent}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, accent: e.target.value } })}
                          className="px-3 py-1.5 border rounded-lg text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1 font-mono">4. Secondary / Card Background</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={config.customPalette.cardBg}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, cardBg: e.target.value } })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.customPalette.cardBg}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, cardBg: e.target.value } })}
                          className="px-3 py-1.5 border rounded-lg text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 font-mono text-xs cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={config.customPalette.isDark}
                          onChange={(e) => onChange({ ...config, customPalette: { ...config.customPalette, isDark: e.target.checked } })}
                          className="rounded h-4 w-4 text-[#905C37]"
                        />
                        This is a Dark Theme Palette
                      </label>
                    </div>
                  </div>

                  {/* CUSTOM LIVE PREVIEW SWATCH */}
                  <div className="flex flex-col justify-between p-6 border rounded-2xl flex-grow h-fit self-center" style={{ backgroundColor: config.customPalette.background, color: config.customPalette.text }}>
                    <div>
                      <span className="font-mono text-[9px] uppercase opacity-60">CUSTOM COLOR SWATCH LIVE STUDY</span>
                      <h4 className="text-xl font-bold mt-2 font-serif uppercase">Aroma of Grain</h4>
                      <p className="text-xs opacity-75 mt-1 font-serif leading-relaxed italic">
                        Every sunset contains stories waiting to be framed and safely stored in memory logs.
                      </p>
                    </div>

                    <div className="mt-8 p-3 rounded-xl border flex items-center justify-between text-xs font-mono" style={{ backgroundColor: config.customPalette.cardBg, borderColor: "rgba(0,0,0,0.12)" }}>
                      <span>Studio Package A</span>
                      <span style={{ color: config.customPalette.accent }}>$1,500</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: PAGE SECTIONS TOGGLE */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Active Page Sections</h2>
                <p className="text-xs text-stone-500 mt-1">Configure which sections are loaded on your published portfolio landing page.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Hero */}
                <div className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <CheckSquare size={18} className="text-[#905C37]" />
                    <div>
                      <span className="text-xs font-bold block">Hero Banner</span>
                      <span className="text-[10px] text-stone-400">Always active. Introduces studio name and slogans.</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#905C37] uppercase font-bold">REQUIRED</span>
                </div>

                {/* About */}
                <label className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between cursor-pointer select-none hover:border-[#905C37]/50 select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.sections.about}
                      onChange={(e) => updateSections({ about: e.target.checked })}
                      className="rounded h-4.5 w-4.5 text-[#905C37]"
                    />
                    <div>
                      <span className="text-xs font-bold block">About / Narrative Bio</span>
                      <span className="text-[10px] text-stone-400">Details visual philosophy, location and booking indexes.</span>
                    </div>
                  </div>
                </label>

                {/* Portfolio */}
                <label className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between cursor-pointer select-none hover:border-[#905C37]/50 select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.sections.portfolio}
                      onChange={(e) => updateSections({ portfolio: e.target.checked })}
                      className="rounded h-4.5 w-4.5 text-[#905C37]"
                    />
                    <div>
                      <span className="text-xs font-bold block">Gallery Portfolio</span>
                      <span className="text-[10px] text-stone-400">Renders asymmetric masonry, lists or sliders loaded from steps.</span>
                    </div>
                  </div>
                </label>

                {/* Services */}
                <label className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between cursor-pointer select-none hover:border-[#905C37]/50 select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.sections.services}
                      onChange={(e) => updateSections({ services: e.target.checked })}
                      className="rounded h-4.5 w-4.5 text-[#905C37]"
                    />
                    <div>
                      <span className="text-xs font-bold block"> tarifa Offerings / Rates</span>
                      <span className="text-[10px] text-stone-400">Presents active camera package cards and custom deliverables list.</span>
                    </div>
                  </div>
                </label>

                {/* Testimonials */}
                <label className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between cursor-pointer select-none hover:border-[#905C37]/50 select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.sections.testimonials}
                      onChange={(e) => updateSections({ testimonials: e.target.checked })}
                      className="rounded h-4.5 w-4.5 text-[#905C37]"
                    />
                    <div>
                      <span className="text-xs font-bold block">Praise Client Testimonials</span>
                      <span className="text-[10px] text-stone-400">Displays mockup quotes and direct professional reviews.</span>
                    </div>
                  </div>
                </label>

                {/* Contact Form */}
                <label className="p-4 bg-white border border-[#E3DACF] rounded-2xl flex items-center justify-between cursor-pointer select-none hover:border-[#905C37]/50 select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.sections.contact}
                      onChange={(e) => updateSections({ contact: e.target.checked })}
                      className="rounded h-4.5 w-4.5 text-[#905C37]"
                    />
                    <div>
                      <span className="text-xs font-bold block">Contact Inquiry Form</span>
                      <span className="text-[10px] text-stone-400">Renders interactive brief capture forms corresponding to chosen layouts.</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW & GENERATE */}
          {currentStep === 7 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif italic text-[#1A1108]">Review & Deploy Engine</h2>
                <p className="text-xs text-stone-500 mt-1">Optimize Search Engine variables, synchronize metrics, and bind custom cloud codes.</p>
              </div>

              {/* Responsive Grid Panel */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Panel 1: Tuning Tools */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-white p-6 border border-[#E3DACF] rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#905C37] font-mono border-b pb-2 flex items-center gap-2">
                      <Globe size={14} /> Search Optimization (SEO)
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5 font-bold text-stone-750">SEO Page Title</label>
                        <input
                          type="text"
                          placeholder={`${config.identity.studioName} | Portfolio`}
                          value={config.seo?.pageTitle || ""}
                          onChange={(e) => updateSEO({ pageTitle: e.target.value })}
                          className="w-full text-xs p-3 bg-[#FAF7F2] border border-[#E3DACF] rounded-xl focus:border-[#905C37] focus:outline-none"
                        />
                        <span className="text-[9px] text-stone-400 mt-1 block">The custom HTML browser title. Highly indexed by search engine crawlers.</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5 font-bold text-stone-750">Meta Description</label>
                        <textarea
                          rows={3}
                          placeholder={`Discover the unique, fine-art professional portfolios and media archives of ${config.identity.studioName}. See dynamic visual frame sets and available service packages today.`}
                          value={config.seo?.metaDescription || ""}
                          onChange={(e) => updateSEO({ metaDescription: e.target.value })}
                          className="w-full text-xs p-3 bg-[#FAF7F2] border border-[#E3DACF] rounded-xl focus:border-[#905C37] focus:outline-none"
                        />
                        <span className="text-[9px] text-stone-400 mt-1 block">A brief textual excerpt summarising your creative services for index pages.</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5 font-bold text-stone-750">Google Analytics ID</label>
                        <input
                          type="text"
                          placeholder="UA-XXXXX-Y / G-XXXXXX"
                          value={config.seo?.googleAnalyticsId || ""}
                          onChange={(e) => updateSEO({ googleAnalyticsId: e.target.value })}
                          className="w-full text-xs p-3 bg-[#FAF7F2] border border-[#E3DACF] rounded-xl focus:border-[#905C37] focus:outline-none font-mono"
                        />
                        <span className="text-[9px] text-stone-400 mt-1 block">Incorporate standard tracking pixels (UA-XXXXX-Y / G-XXXXXXX) to monitor live site logs.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Cloud Publish & Auth Status */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Auth portal */}
                  <div className="bg-white p-6 border border-[#E3DACF] rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#905C37] font-mono border-b pb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {user ? <Unlock size={14} className="text-[#34A853]" /> : <Lock size={14} className="text-stone-400" />} Creator Cloud Account
                      </span>
                      {user && (
                        <button 
                          type="button"
                          onClick={logoutUser}
                          className="text-[9px] text-stone-400 hover:text-[#905C37] uppercase flex items-center gap-1 cursor-pointer hover:underline border-none bg-transparent"
                        >
                          <LogOut size={10} /> Logout
                        </button>
                      )}
                    </h3>

                    {!user ? (
                      <div className="space-y-4 text-center py-4">
                        <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                          Sign in with Google to backup your customizable configurations, generate direct links, and list multiple published portfolios under your creator ID.
                        </p>
                        <button
                          type="button"
                          onClick={loginWithGoogle}
                          className="px-6 py-2.5 bg-[#FAF7F2] border border-[#1a1108]/15 hover:border-[#1a1108]/50 text-xs uppercase font-mono tracking-widest font-black transition-all cursor-pointer flex items-center gap-2 mx-auto justify-center rounded-none"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Connect Workspace
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-[#FAF7F2] p-3.5 border border-[#E3DACF] rounded-xl text-xs">
                          <div>
                            <span className="text-[9px] font-mono text-[#905C37] block">ACTIVE CREATOR KEY</span>
                            <span className="font-bold text-stone-850">{user.email}</span>
                          </div>
                          {user.photoURL && (
                            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-stone-200" />
                          )}
                        </div>

                        {/* Save Trigger button */}
                        <button
                          type="button"
                          onClick={handleSaveAndPublish}
                          disabled={isSaving}
                          className="w-full py-3.5 bg-[#905C37] text-white hover:bg-[#804C27] text-xs font-sans font-black uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="animate-spin" size={14} /> Syncing Master Canvas...
                            </>
                          ) : (
                            <>
                              <Save size={14} /> Deploy Custom Design Code
                            </>
                          )}
                        </button>

                        {/* Copy / Link Box */}
                        {publishUrl ? (
                          <div className="bg-[#FAF7F2] border border-[#E3DACF] p-4 rounded-xl space-y-2.5 animate-smooth">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#905C37] flex items-center gap-1">
                              ● Live Production Port Ready
                            </span>
                            <div className="flex bg-white border border-[#E3DACF] rounded-lg overflow-hidden text-xs">
                              <input 
                                type="text" 
                                readOnly 
                                value={publishUrl} 
                                className="flex-1 px-3 py-2 outline-none font-mono text-[10px] text-stone-600 bg-stone-50 border-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(publishUrl);
                                  setIsCopied(true);
                                  setTimeout(() => setIsCopied(false), 2000);
                                }}
                                className="px-3 border-l border-none bg-[#FAF7F2] hover:bg-stone-100 text-[#905C37] transition-all font-mono text-[10px] font-bold cursor-pointer"
                              >
                                {isCopied ? "COPIED" : "COPY"}
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={publishUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-1.5 bg-[#905C37] text-[#FAF7F2] rounded text-[10px] font-mono uppercase tracking-wider text-center font-bold flex items-center justify-center gap-1 hover:bg-[#1a1108]"
                              >
                                View Portal <ExternalLink size={10} />
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* USER LANDING PAGE LIST DIRECTORY */}
                  {user && (
                    <div className="bg-white p-6 border border-[#E3DACF] rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#905C37] font-mono border-b pb-2 flex items-center justify-between">
                        <span>Directory List of Saved Designs</span>
                        <span className="text-[10px] text-stone-400 font-normal">({userProjects.length}) Saved</span>
                      </h3>

                      {isLoadingProjects ? (
                        <div className="text-center py-6 text-xs text-stone-400 space-y-2">
                          <Loader2 className="animate-spin mx-auto text-[#905C37]" size={16} />
                          <span>Polling design logs...</span>
                        </div>
                      ) : userProjects.length === 0 ? (
                        <p className="text-xs text-stone-400 text-center py-4">No cloud portals saved yet. Create your first save using the action button above.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {userProjects.map((proj) => {
                            const link = `${window.location.origin}/?project=${proj.id}`;
                            return (
                              <div key={proj.id} className="p-3 bg-[#FAF7F2] hover:bg-[#F5F0EA] border border-[#E3DACF] rounded-xl flex items-center justify-between text-xs transition-colors">
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-stone-850 truncate max-w-[140px]">{proj.studioName}</span>
                                  <span className="text-[9px] text-[#905C37] font-mono block capitalize">Style: {proj.config.templateId}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleLoadProject(proj)}
                                    className="px-2 py-1 border border-stone-200 bg-white hover:border-[#905C37] text-stone-600 hover:text-[#905C37] rounded text-[10px] font-mono font-bold cursor-pointer"
                                    title="Load design onto active wizard workspace"
                                  >
                                    LOAD
                                  </button>
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 border border-stone-200 bg-white text-stone-600 hover:text-stone-850 rounded"
                                    title="Open dynamic published site"
                                  >
                                    <ExternalLink size={12} />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteProject(proj.id, e)}
                                    className="p-1 border border-stone-100 bg-red-50 hover:bg-red-100 text-red-600 rounded cursor-pointer border-none"
                                    title="Permanently discard design"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation control row (Footer) */}
        <div className="flex justify-between items-center mt-6 shrink-0 bg-[#FAF7F2] p-4 border border-[#1a1108]/10 rounded-none">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#1a1108]/15 hover:border-[#1a1108]/50 rounded-none hover:bg-[#1a1108] hover:text-[#FAF7F2] text-xs uppercase font-bold tracking-widest disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1108]/80 transition-all font-sans cursor-pointer animate-smooth"
          >
            ← Back
          </button>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-[10px] font-mono tracking-widest uppercase text-[#1a1108]/40">
              Step 0{currentStep} / 07
            </span>
            {currentStep < 7 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#1a1108] text-[#FAF7F2] hover:bg-[#905C37] rounded-none text-xs uppercase font-bold tracking-widest transition-all font-sans cursor-pointer"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={onGenerate}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#905C37] text-white hover:bg-[#1a1108] rounded-none text-xs uppercase font-bold tracking-widest transition-all font-sans cursor-pointer"
              >
                PUBLISH PAGE →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
