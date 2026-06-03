import React, { useState } from "react";
import { 
  Edit3, Download, Copy, Maximize2, Minimize2, Laptop, Tablet as TabletIcon, Smartphone, Check
} from "lucide-react";
import { LandingPageConfig } from "../types";
import { generateExportHTML } from "../utils/htmlExporter";

interface PreviewToolbarProps {
  config: LandingPageConfig;
  onEdit: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  viewport: "desktop" | "tablet" | "mobile";
  onChangeViewport: (view: "desktop" | "tablet" | "mobile") => void;
}

export default function PreviewToolbar({
  config,
  onEdit,
  isFullscreen,
  onToggleFullscreen,
  viewport,
  onChangeViewport
}: PreviewToolbarProps) {
  const [copied, setCopied] = useState(false);

  // Trigger HTML download action
  const handleDownload = () => {
    const htmlString = generateExportHTML(config);
    const blob = new Blob([htmlString], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    // Format filename corresponding to studio name
    const rawName = config.identity.studioName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "framr";
    link.setAttribute("download", `${rawName}-landing-page.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mock clipboard action
  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1108]/95 border-b border-[#FAF6F0]/15 shadow-2xl backdrop-blur-md text-white rounded-full px-4 md:px-6 py-3 flex items-center gap-4 border transition-all md:max-w-fit max-w-[95%] text-xs antialiased text-stone-200">
      
      {/* Return & Edit Action first */}
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors font-bold uppercase tracking-wider"
        title="Return to Builder Step Wizard"
      >
        <Edit3 size={13} className="text-[#9C7C54]" />
        <span>Edit</span>
      </button>

      {/* Divider line */}
      <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

      {/* Responsive viewport controllers (only visible when not in strict fullscreen) */}
      {!isFullscreen && (
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-0.5 rounded-full border border-white/5">
          <button
            onClick={() => onChangeViewport("desktop")}
            className={`p-1.5 rounded-full transition-colors ${viewport === "desktop" ? "bg-[#9C7C54] text-white" : "hover:bg-white/10"}`}
            title="Desktop Canvas (100% Screen)"
          >
            <Laptop size={14} />
          </button>
          <button
            onClick={() => onChangeViewport("tablet")}
            className={`p-1.5 rounded-full transition-colors ${viewport === "tablet" ? "bg-[#9C7C54] text-white" : "hover:bg-white/10"}`}
            title="Tablet Resolution Frame (768px)"
          >
            <TabletIcon size={14} />
          </button>
          <button
            onClick={() => onChangeViewport("mobile")}
            className={`p-1.5 rounded-full transition-colors ${viewport === "mobile" ? "bg-[#9C7C54] text-white" : "hover:bg-white/10"}`}
            title="Mobile Screen Frame (400px)"
          >
            <Smartphone size={14} />
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="h-4 w-[1px] bg-white/10"></div>

      {/* Primary HTML Download Action */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-1 px-3 py-1.5 bg-[#9C7C54] hover:opacity-90 active:scale-95 text-white font-bold rounded-full transition-all uppercase tracking-wider shrink-0"
        title="Export full index.html file with compiled Tailwind structures"
      >
        <Download size={13} />
        <span>Export Page</span>
      </button>

      {/* Clipboard simulation */}
      <button
        onClick={handleCopyLink}
        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center shrink-0"
        title="Copy App URL for Preview Share"
      >
        {copied ? (
          <Check size={14} className="text-emerald-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>

      {/* Fullscreen Mode element */}
      <button
        onClick={onToggleFullscreen}
        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors hidden sm:flex items-center justify-center shrink-0"
        title={isFullscreen ? "Exit Fullscreen Hub" : "Simulate Fullscreen Website Preview"}
      >
        {isFullscreen ? (
          <Minimize2 size={14} className="text-[#9C7C54]" />
        ) : (
          <Maximize2 size={14} />
        )}
      </button>

    </div>
  );
}
