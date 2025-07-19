import React from "react";
import { ImageOverlay } from "../../core/types";
export type AnimationTemplate = {
    name: string;
    preview: string;
    isPro?: boolean;
    enter: (frame: number, durationInFrames: number) => {
        transform?: string;
        opacity?: number;
    };
    exit: (frame: number, durationInFrames: number) => {
        transform?: string;
        opacity?: number;
    };
};
export declare const animationTemplates: Record<string, AnimationTemplate>;
/**
 * Props for the ImageLayerContent component
 * @interface ImageLayerContentProps
 * @property {ImageOverlay} overlay - The image overlay object containing source and style information
 * @property {string | undefined} baseUrl - The base URL for the image
 */
interface ImageLayerContentProps {
    overlay: ImageOverlay;
    baseUrl?: string;
}
/**
 * ImageLayerContent Component
 *
 * @component
 * @description
 * Renders an image layer in the video editor with animation support.
 * Features include:
 * - Enter/exit animations
 * - Style customization (fit, position, opacity)
 * - Transform effects
 * - Visual effects (filters, shadows, borders)
 * - Filter presets (retro, vintage, noir, etc.)
 * - Border radius customization
 *
 * The component handles both the visual presentation and animation
 * timing for image overlays.
 *
 * @example
 * ```tsx
 * <ImageLayerContent
 *   overlay={{
 *     src: "path/to/image.jpg",
 *     styles: {
 *       objectFit: "cover",
 *       filter: "contrast(120%) saturate(110%)", // Can be a preset or custom filter
 *       borderRadius: "8px",
 *       animation: {
 *         enter: "fadeIn",
 *         exit: "fadeOut"
 *       }
 *     }
 *   }}
 * />
 * ```
 */
export declare const ImageLayerContent: React.FC<ImageLayerContentProps>;
export {};
//# sourceMappingURL=image-layer-content.d.ts.map