import React from "react";
import { CaptionOverlay } from "../../core/types";
/**
 * Props for the CaptionLayerContent component
 * @interface CaptionLayerContentProps
 * @property {CaptionOverlay} overlay - The caption overlay object containing timing and style information
 */
interface CaptionLayerContentProps {
    overlay: CaptionOverlay;
}
/**
 * CaptionLayerContent Component
 *
 * @component
 * @description
 * Renders animated captions in the video editor with word-by-word highlighting.
 * Features include:
 * - Word-by-word timing and animation
 * - Customizable text styles and animations
 * - Smooth transitions between words
 * - Dynamic highlighting based on current frame
 *
 * The component calculates timing for each word and applies appropriate
 * styling and animations based on the current playback position.
 *
 * @example
 * ```tsx
 * <CaptionLayerContent
 *   overlay={{
 *     captions: [...],
 *     styles: {...},
 *     // other overlay properties
 *   }}
 * />
 * ```
 */
export declare const CaptionLayerContent: React.FC<CaptionLayerContentProps>;
export {};
//# sourceMappingURL=caption-layer-content.d.ts.map