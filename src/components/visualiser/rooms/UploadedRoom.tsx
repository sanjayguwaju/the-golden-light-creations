"use client";

import React, { useState } from "react";
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MagicWandRoom } from "./MagicWandRoom";

export interface UploadedRoomProps {
  selectedColorHex: string | null;
  selectedColorName: string | null;
  paintMode?: "fill" | "edge";
}

export const UploadedRoom: React.FC<UploadedRoomProps> = ({
  selectedColorHex,
  selectedColorName,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    toast.success("Photo loaded. Select a colour and click to paint!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (imageSrc) {
    return (
      <div className="relative w-full h-full flex flex-col items-center">
        <MagicWandRoom 
          imageSrc={imageSrc} 
          selectedColorHex={selectedColorHex} 
          selectedColorName={selectedColorName} 
        />
        
        <button
          onClick={() => {
            URL.revokeObjectURL(imageSrc);
            setImageSrc(null);
          }}
          className="absolute top-[64px] right-4 bg-white/90 hover:bg-white text-destructive shadow-md border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors z-50"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove Photo
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#C9A84C] dark:hover:border-[#C9A84C] bg-white/50 dark:bg-slate-900/50 transition-colors p-8 text-center cursor-pointer relative group min-h-[400px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] transition-colors">
        <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#C9A84C] transition-colors" />
      </div>
      <h3 className="text-xl font-display font-bold text-reliance-navy dark:text-white mb-2">
        Upload Your Own Photo
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
        Upload a clear photo of your room or exterior. Our smart edge-detection will let you click and fill surfaces with Reliance Paints colors.
      </p>
      
      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> JPG</span>
        <span>•</span>
        <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> PNG</span>
        <span>•</span>
        <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> WEBP</span>
      </div>
    </div>
  );
};
