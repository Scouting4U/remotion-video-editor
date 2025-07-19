import React from "react";
export interface StickerOverlay {
    id: number;
    type: "sticker";
    content: string;
    left: number;
    top: number;
    width: number;
    height: number;
    rotation: number;
    styles?: {
        opacity?: number;
        [key: string]: any;
    };
    props?: Record<string, any>;
}
export declare const discountSticker: StickerTemplate;
export interface StickerTemplateProps {
    overlay: StickerOverlay;
    isSelected: boolean;
    onUpdate?: (updates: Partial<StickerOverlay>) => void;
}
export interface StickerTemplateConfig {
    id: string;
    name: string;
    category: string;
    thumbnail?: string;
    defaultProps?: Record<string, any>;
    isPro?: boolean;
    layout?: "single" | "double";
}
export interface StickerTemplate {
    config: StickerTemplateConfig;
    Component: React.ComponentType<StickerTemplateProps>;
}
interface StickerLayerContentProps {
    overlay: StickerOverlay;
    isSelected: boolean;
    onUpdate?: (updates: Partial<StickerOverlay>) => void;
}
export declare const templateMap: Record<string, StickerTemplate>;
export declare const StickerLayerContent: React.FC<StickerLayerContentProps>;
export {};
//# sourceMappingURL=sticker-layer-content.d.ts.map