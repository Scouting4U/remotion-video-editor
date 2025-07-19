import React from "react";
import { Overlay } from "./core/types";
export type MyCompProps = {
    /** Array of overlay objects to be rendered */
    readonly overlays: Overlay[];
    /** Function to set the currently selected overlay ID */
    readonly setSelectedOverlayId: React.Dispatch<React.SetStateAction<number | null>>;
    /** Currently selected overlay ID, or null if none selected */
    readonly selectedOverlayId: number | null;
    /**
     * Function to update an overlay
     * @param overlayId - The ID of the overlay to update
     * @param updater - Function that receives the current overlay and returns an updated version
     */
    readonly changeOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
    /** Duration in frames of the composition */
    readonly durationInFrames: number;
    /** Frames per second of the composition */
    readonly fps: number;
    /** Width of the composition */
    readonly width: number;
    /** Height of the composition */
    readonly height: number;
    /** Base URL for media assets (optional) */
    readonly baseUrl?: string;
    timeline: any;
};
export declare const MyComp: React.FC<MyCompProps>;
//# sourceMappingURL=composition.d.ts.map