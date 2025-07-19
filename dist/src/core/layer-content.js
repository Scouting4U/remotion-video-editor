"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerContent = void 0;
const react_1 = __importDefault(require("react"));
const text_layer_content_1 = require("../overlays/text/text-layer-content");
const remotion_1 = require("remotion");
const types_1 = require("./types");
const caption_layer_content_1 = require("../overlays/captions/caption-layer-content");
const video_layer_content_1 = require("../overlays/video/video-layer-content");
const sound_layer_content_1 = require("../overlays/sounds/sound-layer-content");
const sticker_layer_content_1 = require("../overlays/stickers/sticker-layer-content");
const image_layer_content_1 = require("../overlays/images/image-layer-content");
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
const LayerContent = ({ overlay, baseUrl, }) => {
    /**
     * Common styling applied to all layer types
     * Ensures consistent dimensions across different content types
     */
    const frame = (0, remotion_1.useCurrentFrame)();
    const commonStyle = {
        width: "100%",
        height: "100%",
    };
    switch (overlay.type) {
        case types_1.OverlayType.VIDEO:
            return (react_1.default.createElement("div", { style: { ...commonStyle } },
                react_1.default.createElement(video_layer_content_1.VideoLayerContent, { overlay: overlay, baseUrl: baseUrl })));
        case types_1.OverlayType.TEXT:
            return (react_1.default.createElement("div", { style: { ...commonStyle } },
                react_1.default.createElement(text_layer_content_1.TextLayerContent, { overlay: overlay })));
        case types_1.OverlayType.SHAPE:
            return (react_1.default.createElement("div", { style: {
                    ...commonStyle,
                    backgroundColor: overlay.content,
                } }));
        case types_1.OverlayType.IMAGE:
            return (react_1.default.createElement("div", { style: { ...commonStyle } },
                react_1.default.createElement(image_layer_content_1.ImageLayerContent, { overlay: overlay, baseUrl: baseUrl })));
        case types_1.OverlayType.CAPTION:
            return (react_1.default.createElement("div", { style: {
                    ...commonStyle,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                } },
                react_1.default.createElement(caption_layer_content_1.CaptionLayerContent, { overlay: overlay })));
        case types_1.OverlayType.STICKER:
            return (react_1.default.createElement("div", { style: { ...commonStyle } },
                react_1.default.createElement(sticker_layer_content_1.StickerLayerContent, { overlay: overlay, isSelected: false })));
        case types_1.OverlayType.SOUND:
            return react_1.default.createElement(sound_layer_content_1.SoundLayerContent, { overlay: overlay, baseUrl: baseUrl });
        default:
            return null;
    }
};
exports.LayerContent = LayerContent;
