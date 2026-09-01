"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import MagicWand from "magic-wand-tool";
import { SlidersHorizontal, Wand2, Eraser, Trash2, Brush } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

/**
 * Morphological dilation: grow the mask by `pixels` px to fill tiny edge gaps.
 */
function dilateUint8(mask: Uint8Array, width: number, height: number, radius: number): Uint8Array {
  const result = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] === 1) {
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              result[ny * width + nx] = 1;
            }
          }
        }
      }
    }
  }
  return result;
}

/**
 * Sobel edge map: for each pixel compute gradient magnitude from luminance.
 * Pre-computed once per image load; reused for every click.
 * Range is ~0–720. Object/furniture boundaries typically produce 60–300+.
 */
function computeSobelEdges(data: Uint8Array, width: number, height: number): Float32Array {
  const edges = new Float32Array(width * height);
  const lum = (i: number) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const tl = lum((( y-1)*width + (x-1)) * 4), tc = lum(((y-1)*width + x) * 4), tr = lum(((y-1)*width + (x+1)) * 4);
      const ml = lum((    y *width + (x-1)) * 4),                                   mr = lum(((  y)*width + (x+1)) * 4);
      const bl = lum(((y+1)*width + (x-1)) * 4), bc = lum(((y+1)*width + x) * 4), br = lum(((y+1)*width + (x+1)) * 4);

      const gx = -tl - 2*ml - bl + tr + 2*mr + br;
      const gy = -tl - 2*tc - tr + bl + 2*bc + br;
      edges[y * width + x] = Math.sqrt(gx * gx + gy * gy);
    }
  }
  return edges;
}

/**
 * Edge-aware flood fill using a pre-computed Sobel edge map.
 *
 * Two stopping conditions:
 *   1. colorTolerance  — pixel color vs seed must be within this Euclidean distance
 *   2. edgeBarrier     — the Sobel gradient at the NEIGHBOR pixel must be below this
 *
 * Using the edge map (not per-step differences) means:
 *  • Noise-stable: 3×3 Sobel neighborhood, not single-pixel steps
 *  • Order-independent: doesn’t depend on DFS traversal sequence
 *  • Real edge detection: stops at geometry boundaries even when colors match
 */
function edgeAwareFloodFill(
  data: Uint8Array,
  edgeMap: Float32Array,
  width: number,
  height: number,
  startX: number,
  startY: number,
  colorTolerance: number,
  edgeBarrier: number       // Sobel magnitude threshold (UI 5–60 → scaled ×4 internally)
): Uint8Array {
  const mask    = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);

  const si = (startY * width + startX) * 4;
  const sr = data[si], sg = data[si + 1], sb = data[si + 2];

  const stack: number[] = [startY * width + startX];
  visited[startY * width + startX] = 1;

  const DIRS = [-1, 1, -width, width];

  while (stack.length > 0) {
    const pos = stack.pop()!;
    mask[pos] = 1;

    const cy = (pos / width) | 0;
    const cx = pos % width;

    for (const d of DIRS) {
      const npos = pos + d;
      const nx = cx + (d === -1 ? -1 : d === 1 ? 1 : 0);
      const ny = cy + (d === -width ? -1 : d === width ? 1 : 0);

      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      if (visited[npos]) continue;
      visited[npos] = 1;

      // Stop at strong edges (furniture boundaries, window frames, shadows)
      if (edgeMap[npos] > edgeBarrier) continue;

      // Stop if color has drifted too far from seed
      const nIdx = npos * 4;
      const dr = data[nIdx] - sr, dg = data[nIdx + 1] - sg, db = data[nIdx + 2] - sb;
      if (Math.sqrt(dr*dr + dg*dg + db*db) > colorTolerance) continue;

      stack.push(npos);
    }
  }

  return mask;
}

/**
 * Create a pre-baked off-screen canvas for a paint layer.
 * Stores each masked pixel as a semi-transparent colored pixel.
 * Drawn onto the overlay canvas with source-over, then the overlay
 * is CSS-blended with the base canvas using mix-blend-mode: multiply.
 */
function bakeMaskToCanvas(
  mask: Uint8Array,
  width: number,
  height: number,
  hexColor: string
): HTMLCanvasElement {
  const rgb = hexToRgb(hexColor);
  if (!rgb) throw new Error("Invalid hex color");

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 1) {
      imgData.data[i * 4 + 0] = rgb.r;
      imgData.data[i * 4 + 1] = rgb.g;
      imgData.data[i * 4 + 2] = rgb.b;
      imgData.data[i * 4 + 3] = 255; // full opacity — blend mode handles depth/shadow preservation
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface BakedLayer {
  bakedCanvas: HTMLCanvasElement;
  color: string;
  isEraser?: boolean;
}

export interface MagicWandRoomProps {
  imageSrc: string;
  selectedColorHex: string | null;
  selectedColorName: string | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CachedRoomData {
  img: HTMLImageElement;
  width: number;
  height: number;
  raw: Uint8Array;
  edges: Float32Array;
}
const roomImageCache = new Map<string, CachedRoomData>();

export const MagicWandRoom: React.FC<MagicWandRoomProps> = ({
  imageSrc,
  selectedColorHex,
  selectedColorName,
}) => {
  const baseCanvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef    = useRef<HTMLImageElement | null>(null);
  const rawImageDataRef = useRef<Uint8Array | null>(null);
  const sobelEdgeMapRef = useRef<Float32Array | null>(null); // pre-computed per image

  const [dims, setDims]           = useState({ width: 1600, height: 900 });
  const [layers, setLayers]       = useState<BakedLayer[]>([]);
  const [tolerance, setTolerance] = useState(28);
  const [edgeSensitivity, setEdgeSensitivity] = useState(18); // local gradient threshold
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoaded, setIsLoaded]   = useState(false);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [activeTool, setActiveTool] = useState<'wand' | 'brush'>('wand');
  const [brushSize, setBrushSize] = useState(40);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentStrokeCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // ── Draw base image onto the base canvas ──────────────────────────────────
  const drawBase = useCallback(() => {
    const canvas = baseCanvasRef.current;
    const img    = baseImageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = dims;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    // If already in cache, reuse raw data and edge map
    const cached = roomImageCache.get(imageSrc);
    if (cached) {
      rawImageDataRef.current = cached.raw;
      sobelEdgeMapRef.current = cached.edges;
      return;
    }

    // Capture raw pixel data for flood fill
    const imgData = ctx.getImageData(0, 0, width, height);
    const raw = new Uint8Array(imgData.data.buffer);
    rawImageDataRef.current = raw;

    // Pre-compute Sobel edge map — done once here, reused for every click
    const edges = computeSobelEdges(raw, width, height);
    sobelEdgeMapRef.current = edges;

    roomImageCache.set(imageSrc, {
      img,
      width,
      height,
      raw,
      edges,
    });
  }, [dims, imageSrc]);

  // ── Composite all baked layers onto overlay canvas ─────────────────────────
  const redrawOverlay = useCallback((currentLayers: BakedLayer[]) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, dims.width, dims.height);
    for (const layer of currentLayers) {
      if (layer.isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(layer.bakedCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.drawImage(layer.bakedCanvas, 0, 0);
      }
    }
  }, [dims]);

  // ── Load image when imageSrc changes ──────────────────────────────────────
  useEffect(() => {
    setIsLoaded(false);
    setLayers([]);
    rawImageDataRef.current  = null;
    sobelEdgeMapRef.current  = null;

    const cached = roomImageCache.get(imageSrc);
    if (cached) {
      baseImageRef.current = cached.img;
      rawImageDataRef.current = cached.raw;
      sobelEdgeMapRef.current = cached.edges;
      setDims({ width: cached.width, height: cached.height });
      setIsLoaded(true);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const maxW = 1600, maxH = 900;
      if (w > maxW) { h = Math.round((h * maxW) / w); w = maxW; }
      if (h > maxH) { w = Math.round((w * maxH) / h); h = maxH; }
      baseImageRef.current = img;
      setDims({ width: w, height: h });
      setIsLoaded(true);
    };
    img.onerror = () => {
      console.error("MagicWandRoom: failed to load image:", imageSrc);
    };
  }, [imageSrc]);

  // ── Draw base image after load / dims change ───────────────────────────────
  useEffect(() => {
    if (isLoaded) drawBase();
  }, [isLoaded, drawBase]);

  // ── Update overlay on layer change ────────────────────────────────────────
  useEffect(() => {
    redrawOverlay(layers);
  }, [layers, redrawOverlay]);

  // ── Click handler: edge-aware flood fill → bake layer ────────────────────────
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (activeTool !== 'wand') return;
      if ((!selectedColorHex && !isEraserMode) || !rawImageDataRef.current || !sobelEdgeMapRef.current || isProcessing || !isLoaded) return;

      const canvas = baseCanvasRef.current!;
      const rect   = canvas.getBoundingClientRect();
      const { width, height } = dims;
      const scaleX = width  / rect.width;
      const scaleY = height / rect.height;
      const x = Math.round((e.clientX - rect.left) * scaleX);
      const y = Math.round((e.clientY - rect.top)  * scaleY);

      if (x < 0 || x >= width || y < 0 || y >= height) return;

      setIsProcessing(true);

      setTimeout(() => {
        try {
          const data    = rawImageDataRef.current!;
          const edgeMap = sobelEdgeMapRef.current!;

          // edgeBarrier: UI slider 5–60 mapped to Sobel magnitude 20–240
          // (Sobel for object edges typically 60–300; for subtle wall texture 5–30)
          const edgeBarrier = edgeSensitivity * 4;

          const rawMask = edgeAwareFloodFill(
            data, edgeMap, width, height, x, y, tolerance, edgeBarrier
          );

          const mwResult = { data: rawMask, width, height, bytes: 1,
            bounds: { minX: 0, minY: 0, maxX: width - 1, maxY: height - 1 } };
          const smoothed = MagicWand.gaussBlurOnlyBorder(mwResult, 4);

          const dilated = dilateUint8(smoothed.data, width, height, 1);
          const bakedCanvas = bakeMaskToCanvas(dilated, width, height, isEraserMode ? "#000000" : selectedColorHex!);
          setLayers((prev) => [...prev, { bakedCanvas, color: isEraserMode ? "erase" : selectedColorHex!, isEraser: isEraserMode }]);
        } catch (err) {
          console.error("Edge-aware fill error:", err);
        } finally {
          setIsProcessing(false);
        }
      }, 0);
    },
    [selectedColorHex, isProcessing, isLoaded, dims, tolerance, edgeSensitivity]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeTool !== 'brush') return;
    if ((!selectedColorHex && !isEraserMode) || !isLoaded) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    
    const canvas = baseCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = dims.width / rect.width;
    const scaleY = dims.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    const newCanvas = document.createElement('canvas');
    newCanvas.width = dims.width;
    newCanvas.height = dims.height;
    const ctx = newCanvas.getContext('2d')!;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraserMode ? '#000000' : selectedColorHex!;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    currentStrokeCtxRef.current = ctx;
    setIsDrawing(true);
    setLayers(prev => [...prev, { bakedCanvas: newCanvas, color: isEraserMode ? "erase" : selectedColorHex!, isEraser: isEraserMode }]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDrawing || !currentStrokeCtxRef.current || activeTool !== 'brush') return;
    const canvas = baseCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = dims.width / rect.width;
    const scaleY = dims.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    currentStrokeCtxRef.current.lineTo(x, y);
    currentStrokeCtxRef.current.stroke();

    setLayers(prev => [...prev]);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDrawing) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDrawing(false);
      currentStrokeCtxRef.current = null;
    }
  };

  const handleUndo  = () => setLayers((prev) => prev.slice(0, -1));
  const handleClear = () => setLayers([]);

  const { width, height } = dims;

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* ── Controls bar ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          {/* Tool Toggle */}
          <div className="flex items-center bg-slate-200/50 dark:bg-slate-800 p-0.5 rounded-none border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTool('wand')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTool === 'wand' ? 'bg-white dark:bg-slate-700 shadow-sm text-reliance-navy dark:text-white' : 'text-muted-foreground hover:text-reliance-navy dark:hover:text-white'}`}
            >
              <Wand2 className="w-3.5 h-3.5" /> Wand
            </button>
            <button
              onClick={() => setActiveTool('brush')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTool === 'brush' ? 'bg-white dark:bg-slate-700 shadow-sm text-reliance-navy dark:text-white' : 'text-muted-foreground hover:text-reliance-navy dark:hover:text-white'}`}
            >
              <Brush className="w-3.5 h-3.5" /> Brush
            </button>
          </div>

          {/* Action Toggle */}
          <div className="flex items-center bg-slate-200/50 dark:bg-slate-800 p-0.5 rounded-none border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setIsEraserMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${!isEraserMode ? 'bg-white dark:bg-slate-700 shadow-sm text-reliance-navy dark:text-white' : 'text-muted-foreground hover:text-reliance-navy dark:hover:text-white'}`}
            >
              Paint
            </button>
            <button
              onClick={() => setIsEraserMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${isEraserMode ? 'bg-white dark:bg-slate-700 shadow-sm text-reliance-navy dark:text-white' : 'text-muted-foreground hover:text-reliance-navy dark:hover:text-white'}`}
            >
              Erase
            </button>
          </div>
          
          {/* Wand Controls */}
          {activeTool === 'wand' && (
            <>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fill:</span>
                <input type="range" min={5} max={90} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="w-24 accent-[#C9A84C]" />
                <span className="text-[10px] font-mono font-bold text-reliance-navy dark:text-white w-5">{tolerance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Edge:</span>
                <input type="range" min={5} max={60} value={edgeSensitivity} onChange={(e) => setEdgeSensitivity(Number(e.target.value))} className="w-24 accent-[#C9A84C]" />
                <span className="text-[10px] font-mono font-bold text-reliance-navy dark:text-white w-5">{edgeSensitivity}</span>
              </div>
            </>
          )}

          {/* Brush Controls */}
          {activeTool === 'brush' && (
            <div className="flex items-center gap-2">
              <Brush className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Size:</span>
              <input type="range" min={5} max={200} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-24 accent-[#C9A84C]" />
              <span className="text-[10px] font-mono font-bold text-reliance-navy dark:text-white w-7">{brushSize}px</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isProcessing && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A84C] animate-pulse flex items-center gap-1">
              <Wand2 className="w-3 h-3" /> Detecting…
            </span>
          )}
          <button
            onClick={handleUndo}
            disabled={layers.length === 0}
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-muted-foreground hover:text-reliance-navy dark:hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Undo
          </button>
          <button
            onClick={handleClear}
            disabled={layers.length === 0}
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-destructive/40 text-destructive hover:bg-destructive/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* ── Instruction tip ──────────────────────────────────────── */}
      <div className="flex items-start gap-2 px-0.5">
        <Wand2 className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {activeTool === 'brush' ? (
             <>
               <strong className="text-reliance-navy dark:text-white">Click and drag</strong> to {isEraserMode ? 'manually erase mistakes' : 'manually paint areas'}.
             </>
          ) : isEraserMode ? (
            <>
              <strong className="text-reliance-navy dark:text-white">Click on any accidentally painted area</strong> (like furniture or decor) to erase the paint.
            </>
          ) : selectedColorHex ? (
            <>
              <strong className="text-reliance-navy dark:text-white">Click on any wall</strong> to
              apply{" "}
              <strong style={{ color: selectedColorHex }}>{selectedColorName}</strong>.{" "}
              Increase <em>Tolerance</em> if the selection misses parts of the wall.
            </>
          ) : (
            <span className="text-amber-600 dark:text-[#C9A84C] font-semibold">
              ← Select a colour from the Studio palette first, then click any wall.
            </span>
          )}
        </p>
      </div>

      {/* ── Canvas stack ─────────────────────────────────────────── */}
      <div
        className="relative w-full min-h-[400px] md:min-h-0 select-none overflow-hidden border border-slate-200 dark:border-slate-800 cursor-crosshair"
        style={{ aspectRatio: `${width}/${height}`, touchAction: 'none' }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Base image */}
        <canvas
          ref={baseCanvasRef}
          width={width}
          height={height}
          className="absolute inset-0 w-full h-full block object-cover"
        />

        {/* Paint layers overlay — CSS 'multiply' blend mode preserves wall shadows/highlights while applying exact color */}
        <canvas
          ref={overlayCanvasRef}
          width={width}
          height={height}
          className="absolute inset-0 w-full h-full block pointer-events-none object-cover"
          style={{ mixBlendMode: "multiply", opacity: 0.85 }}
        />

        {/* Processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
            <div className="bg-reliance-navy text-white px-4 py-2 flex items-center gap-2 shadow-xl">
              <Wand2 className="w-4 h-4 text-[#C9A84C] animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Detecting wall…
              </span>
            </div>
          </div>
        )}

        {/* No colour selected hint */}
        {!selectedColorHex && !isEraserMode && (
          <div className="absolute top-4 left-4 bg-reliance-navy/90 text-white px-4 py-3 border-l-4 border-[#C9A84C] pointer-events-none max-w-xs">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
              Select a Colour First
            </p>
            <p className="text-xs">
              Pick a shade from the studio panel, then click a wall to paint it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
