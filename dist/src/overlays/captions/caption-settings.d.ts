import React from "react";
import { CaptionOverlay, CaptionStyles, Caption } from "../../core/types";
/**
 * Props for the CaptionSettings component
 * @interface CaptionSettingsProps
 * @property {CaptionOverlay} localOverlay - Current caption overlay being edited
 * @property {Function} setLocalOverlay - Function to update the caption overlay
 * @property {number} currentFrame - Current frame position in the video
 * @property {number} startFrame - Starting frame of the caption overlay
 * @property {Caption[]} captions - Array of caption objects
 */
interface CaptionSettingsProps {
    localOverlay: CaptionOverlay;
    setLocalOverlay: (overlay: CaptionOverlay) => void;
    currentFrame: number;
    startFrame: number;
    captions: Caption[];
}
/**
 * Default styling configuration for captions
 * Defines the base appearance for all captions including font, size, colors, and highlight effects
 */
export declare const defaultCaptionStyles: CaptionStyles;
/**
 * CaptionSettings Component
 *
 * @component
 * @description
 * Provides a tabbed interface for managing caption settings including:
 * - Caption text and timing management
 * - Visual style customization
 * - Voice settings (planned feature)
 *
 * The component uses a tab-based layout to organize different aspects of caption
 * configuration, making it easier for users to focus on specific settings.
 *
 * @example
 * ```tsx
 * <CaptionSettings
 *   localOverlay={captionOverlay}
 *   setLocalOverlay={handleOverlayUpdate}
 *   currentFrame={30}
 *   startFrame={0}
 *   captions={[...]}
 * />
 * ```
 */
export declare const CaptionSettings: React.FC<CaptionSettingsProps>;
export {};
//# sourceMappingURL=caption-settings.d.ts.map