/**
 * Media Filter Presets
 *
 * This file defines preset CSS filters that can be applied to video and image overlays.
 * Each preset represents a specific visual style that can be selected from the UI.
 * The filter strings are valid CSS filter values to be directly applied to the media element.
 */
export interface MediaFilterPreset {
    id: string;
    name: string;
    description: string;
    filter: string;
}
export declare const MEDIA_FILTER_PRESETS: MediaFilterPreset[];
/**
 * Helper function to parse a CSS filter string and extract individual filter values
 *
 * @param filterString - CSS filter string to parse
 * @returns Object with individual filter values
 */
export declare const parseFilterString: (filterString?: string) => Record<string, string>;
/**
 * Helper function to get a preset by its ID
 *
 * @param presetId - ID of the preset to retrieve
 * @returns The preset object or the "none" preset if not found
 */
export declare const getPresetById: (presetId: string) => MediaFilterPreset;
//# sourceMappingURL=media-filter-presets.d.ts.map