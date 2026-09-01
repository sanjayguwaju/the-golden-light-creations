export type FontSize = "small" | "normal" | "large";

export interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}
