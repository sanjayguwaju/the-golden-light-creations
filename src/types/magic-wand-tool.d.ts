declare module 'magic-wand-tool' {
  interface MaskResult {
    data: Uint8Array;
    width: number;
    height: number;
    bounds: {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    };
  }

  interface ImageInput {
    data: Uint8Array;
    width: number;
    height: number;
    bytes: number;
  }

  function floodFill(
    image: ImageInput,
    px: number,
    py: number,
    colorThreshold: number,
    mask?: Uint8Array,
    includeBorders?: boolean
  ): MaskResult | null;

  function gaussBlur(mask: MaskResult, radius: number): MaskResult;

  function gaussBlurOnlyBorder(
    mask: MaskResult,
    radius: number,
    visited?: Uint8Array
  ): MaskResult;

  function traceContours(mask: MaskResult): Array<{
    inner: boolean;
    label: number;
    points: Array<{ x: number; y: number }>;
  }>;
}
