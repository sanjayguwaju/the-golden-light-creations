"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { MagicWandRoom, MagicWandRoomProps } from "./MagicWandRoom";

export interface CustomRoomProps {
  selectedColorHex: string | null;
  selectedColorName: string | null;
}

export const CustomRoom: React.FC<CustomRoomProps> = ({ selectedColorHex, selectedColorName }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc]   = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    // Revoke any previous object URL
    if (imageSrc?.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (!imageSrc) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer min-h-80 ${
          isDragging
            ? "border-[#C9A84C] bg-[#C9A84C]/5 scale-[1.01]"
            : "border-slate-200 dark:border-slate-700 hover:border-[#C9A84C]/60 hover:bg-slate-50 dark:hover:bg-slate-900/40"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        <div className="flex flex-col items-center gap-4 p-10 text-center pointer-events-none">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors ${
              isDragging ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <Upload className={`w-7 h-7 transition-colors ${isDragging ? "text-[#C9A84C]" : "text-slate-400"}`} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-reliance-navy dark:text-white mb-1">
              Upload Your Photo
            </p>
            <p className="text-xs text-muted-foreground">
              Drag & drop or click to browse — JPG, PNG, WEBP supported
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            {["Room Photo", "Exterior", "Office"].map((label) => (
              <span
                key={label}
                className="text-[9px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Show a "Change Photo" button above the room */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (imageSrc?.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
            setImageSrc(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-muted-foreground hover:text-reliance-navy dark:hover:text-white hover:border-reliance-navy dark:hover:border-white transition-all flex items-center gap-1.5"
        >
          <Upload className="w-3 h-3" /> Change Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      <MagicWandRoom
        imageSrc={imageSrc}
        selectedColorHex={selectedColorHex}
        selectedColorName={selectedColorName}
      />
    </div>
  );
};
