import React from "react";
import { Overlay } from "./types";
/**
 * Props for the LayerContent component
 * @interface LayerContentProps
 * @property {Overlay} overlay - The overlay object containing type and content information
 */
interface LayerContentProps {
    overlay: Overlay;
    baseUrl?: string;
}
/**
 * LayerContent Component
 *
 * @component
 * @description
 * A component that renders different types of content layers in the video editor.
 * It acts as a switch component that determines which specific layer component
 * to render based on the overlay type.
 *
 * Supported overlay types:
 * - VIDEO: Renders video content with VideoLayerContent
 * - TEXT: Renders text overlays with TextLayerContent
 * - SHAPE: Renders colored shapes
 * - IMAGE: Renders images with ImageLayerContent
 * - CAPTION: Renders captions with CaptionLayerContent
 * - SOUND: Renders audio elements using Remotion's Audio component
 *
 * Each layer type maintains consistent sizing through commonStyle,
 * with specific customizations applied as needed.
 *
 * @example
 * ```tsx
 * <LayerContent overlay={{
 *   type: OverlayType.TEXT,
 *   content: "Hello World",
 *   // ... other overlay properties
 * }} />
 * ```
 */
export declare const LayerContent: React.FC<LayerContentProps>;
export {};
//# sourceMappingURL=layer-content.d.ts.map