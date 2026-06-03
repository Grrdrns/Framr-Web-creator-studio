import { useState, useEffect, CSSProperties } from "react";
import { LandingPageConfig } from "./types";
import { STARTER_CONFIG, PALETTES } from "./data/defaults";
import BuilderShell from "./components/BuilderShell";
import PreviewToolbar from "./components/PreviewToolbar";
import LuminaryTemplate from "./components/templates/LuminaryTemplate";
import ChronicleTemplate from "./components/templates/ChronicleTemplate";
import ObsidianTemplate from "./components/templates/ObsidianTemplate";
import ArcadiaTemplate from "./components/templates/ArcadiaTemplate";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const LOCAL_STORAGE_KEY = "framr_landing_config";

export default function App() {
  const [config, setConfig] = useState<LandingPageConfig>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load saved landing page choices, falling back to defaults.", e);
      }
    }
    return STARTER_CONFIG;
  });

  const [mode, setMode] = useState<"builder" | "preview">("builder");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isModified, setIsModified] = useState<boolean>(false);

  const [cloudConfig, setCloudConfig] = useState<LandingPageConfig | null>(null);
  const [isLoadingCloud, setIsLoadingCloud] = useState<boolean>(false);

  // Parse project ID in query search parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project") || params.get("p");
    if (projectId) {
      setIsLoadingCloud(true);
      getDoc(doc(db, "projects", projectId))
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCloudConfig(data.config);
          } else {
            console.error("Project not found in Cloud Projects Registry");
          }
        })
        .catch((err) => {
          console.error("Error loading saved project from database:", err);
        })
        .finally(() => {
          setIsLoadingCloud(false);
        });
    }
  }, []);

  const activeConfig = cloudConfig || config;

  // Sync state to local storage on edits
  const handleConfigChange = (newConfig: LandingPageConfig) => {
    setConfig(newConfig);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
    setIsModified(true);
  };

  // Bind browser check warning for unsaved inputs
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isModified && !cloudConfig) {
        e.preventDefault();
        e.returnValue = "You have unsaved customized modifications. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isModified, cloudConfig]);

  // Handle SEO Meta Information & Google Analytics Dynamic Embedding
  useEffect(() => {
    const active = cloudConfig || config;
    const titleVal = active.seo?.pageTitle || `${active.identity.studioName} | Portfolio`;
    document.title = titleVal;

    // Head description tag matching
    let descriptionElement = document.querySelector('meta[name="description"]');
    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.setAttribute("name", "description");
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute("content", active.seo?.metaDescription || `Bespoke portfolio and content of ${active.identity.studioName}`);

    // Google Analytics Integration
    const gaId = active.seo?.googleAnalyticsId;
    if (gaId) {
      const gaScriptId = "framr-google-analytics";
      let existingScript = document.getElementById(gaScriptId);
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = gaScriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const configScript = document.createElement("script");
        configScript.id = `${gaScriptId}-config`;
        configScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(configScript);
      }
    }
  }, [cloudConfig, config]);

  // Set selected palette variables dynamically in wrapping divs
  const activePalette = activeConfig.paletteType === "preset"
    ? (PALETTES[activeConfig.presetPaletteId] || PALETTES.warmIvory)
    : activeConfig.customPalette;

  const styleVariables = {
    "--theme-bg": activePalette.background,
    "--theme-text": activePalette.text,
    "--theme-accent": activePalette.accent,
    "--theme-card": activePalette.cardBg,
    "--theme-border": activePalette.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  } as CSSProperties;

  // Layout template routing helper
  const renderSelectedTemplate = () => {
    switch (activeConfig.templateId) {
      case "luminary":
        return <LuminaryTemplate config={activeConfig} isPreview />;
      case "chronicle":
        return <ChronicleTemplate config={activeConfig} isPreview />;
      case "obsidian":
        return <ObsidianTemplate config={activeConfig} isPreview />;
      case "arcadia":
        return <ArcadiaTemplate config={activeConfig} isPreview />;
      default:
        return <LuminaryTemplate config={activeConfig} isPreview />;
    }
  };

  if (isLoadingCloud) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 bg-[#905C37] rounded-sm flex items-center justify-center text-[#F5F0EA] font-serif font-black text-2xl italic select-none animate-pulse mx-auto">
            F
          </div>
          <h2 className="text-xl font-serif italic text-stone-900">Retrieving Custom Master Canvas...</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#905C37]">ESTABLISHING SECURE PIXEL CODES</p>
        </div>
      </div>
    );
  }

  if (cloudConfig) {
    return (
      <div style={styleVariables} className="transition-colors duration-500 min-h-screen">
        {renderSelectedTemplate()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col transition-colors">
      
      {/* 1. BUILDER MODE VIEWLAYOUT */}
      {mode === "builder" ? (
        <BuilderShell
          config={config}
          onChange={handleConfigChange}
          onGenerate={() => {
            setIsFullscreen(false);
            setMode("preview");
          }}
        />
      ) : (
        /* 2. PREVIEW MODE VIEWLAYOUT WITH RESPONSIVE SIMULATION FRAMES */
        <div className="flex-1 flex flex-col relative bg-stone-300 min-h-screen overflow-x-hidden antialiased">
          
          {/* Header warning when not in fullscreen mode */}
          {!isFullscreen && (
            <div className="bg-[#1A1108] text-white/90 text-[11px] font-mono py-2.5 px-6 flex justify-between items-center border-b border-white/5 shrink-0 select-none">
              <span className="flex items-center gap-2">
                <span>⚡</span>
                <span>Active Showcase — Simulating <span className="font-bold underline capitalize">{viewport} Viewport</span></span>
              </span>
              <button
                onClick={() => setMode("builder")}
                className="text-stone-300 hover:text-white hover:underline uppercase text-[10px] font-bold tracking-widest bg-white/10 px-2.5 py-1 rounded"
              >
                Back to Config Wizard
              </button>
            </div>
          )}

          {/* Canvas Wrapper applying style variables */}
          <div 
            className={`flex-1 overflow-y-auto transition-all ${isFullscreen ? "p-0" : "p-4 md:p-8"}`}
            style={{ 
              backgroundColor: isFullscreen ? activePalette.background : "" 
            }}
          >
            {isFullscreen ? (
              /* Strict Fullscreen Mode - 100% unconstrained */
              <div style={styleVariables} className="transition-colors duration-500 min-h-screen">
                {renderSelectedTemplate()}
              </div>
            ) : (
              /* Sandbox Simulator Frame */
              <div className="w-full h-full flex items-center justify-center">
                {viewport === "desktop" && (
                  <div 
                    style={styleVariables} 
                    className="w-full max-w-7xl mx-auto bg-[color:var(--theme-bg)] shadow-2xl rounded-2xl border border-stone-200/50 overflow-hidden min-h-[85vh] transition-all"
                  >
                    {renderSelectedTemplate()}
                  </div>
                )}

                {viewport === "tablet" && (
                  <div 
                    style={styleVariables} 
                    className="w-[768px] mx-auto bg-[color:var(--theme-bg)] shadow-2xl rounded-2xl border-4 border-stone-800 min-h-[85vh] overflow-hidden transition-all"
                  >
                    {renderSelectedTemplate()}
                  </div>
                )}

                {viewport === "mobile" && (
                  <div 
                    className="w-[390px] mx-auto shadow-2xl relative rounded-[50px] border-[14px] border-stone-900 overflow-hidden bg-black flex flex-col"
                    style={{ height: "760px" }}
                  >
                    {/* Phone Top Notch Speaker */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-stone-900 z-50 flex items-center justify-center">
                      <div className="w-20 h-3.5 bg-black rounded-b-xl flex items-center justify-center">
                        <div className="w-8 h-1 bg-stone-800 rounded-full"></div>
                      </div>
                    </div>
                    {/* Inner iframe container */}
                    <div 
                      style={styleVariables} 
                      className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden pt-6"
                    >
                      {renderSelectedTemplate()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fixed overlay actions bar */}
          <PreviewToolbar
            config={config}
            viewport={viewport}
            onChangeViewport={setViewport}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
            onEdit={() => setMode("builder")}
          />

        </div>
      )}

    </div>
  );
}
