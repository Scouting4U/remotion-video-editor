import React from "react";
import { StickerOverlay } from "../../types";
interface StickerRendererProps {
    overlay: StickerOverlay;
    isSelected: boolean;
    onUpdate?: (updates: Partial<StickerOverlay>) => void;
}
export declare const StickerRenderer: React.FC<StickerRendererProps>;
export {};
//# sourceMappingURL=sticker-renderer.d.ts.map