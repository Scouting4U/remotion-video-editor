import React from "react";
import { Overlay } from "./types";
/**
 * Props for the Layer component
 * @interface LayerProps
 * @property {Overlay} overlay - The overlay object containing position, dimensions, and content information
 * @property {number | null} selectedOverlayId - ID of the currently selected overlay, used for interaction states
 * @property {string | undefined} baseUrl - The base URL for the video
 */
export declare const Layer: React.FC<{
    overlay: Overlay;
    selectedOverlayId: number | null;
    baseUrl?: string;
}>;
//# sourceMappingURL=Layer.d.ts.map