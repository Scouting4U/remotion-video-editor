import React from "react";
import { ClipOverlay, ImageOverlay } from "../../types";
interface MediaFilterPresetSelectorProps {
    localOverlay: ClipOverlay | ImageOverlay;
    handleStyleChange: (updates: Partial<ClipOverlay["styles"] | ImageOverlay["styles"]>) => void;
}
/**
 * MediaFilterPresetSelector Component
 *
 * A visual component for selecting predefined filters/presets for media (images and videos).
 * Displays visual previews of each filter applied to a thumbnail of the current media.
 *
 * @component
 * @param {MediaFilterPresetSelectorProps} props - Component props
 * @returns {JSX.Element} A grid of filter previews
 */
export declare const MediaFilterPresetSelector: React.FC<MediaFilterPresetSelectorProps>;
export {};
//# sourceMappingURL=media-filter-preset-selector.d.ts.map