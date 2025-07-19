"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const layer_content_1 = require("./layer-content");
/**
 * Props for the Layer component
 * @interface LayerProps
 * @property {Overlay} overlay - The overlay object containing position, dimensions, and content information
 * @property {number | null} selectedOverlayId - ID of the currently selected overlay, used for interaction states
 * @property {string | undefined} baseUrl - The base URL for the video
 */
const Layer = ({ overlay, selectedOverlayId, baseUrl }) => {
    /**
     * Memoized style calculations for the layer
     * Handles positioning, dimensions, rotation, and z-index based on:
     * - Overlay position (left, top)
     * - Dimensions (width, height)
     * - Rotation
     * - Row position for z-index stacking
     * - Selection state for pointer events
     *
     * @returns {React.CSSProperties} Computed styles for the layer
     */
    const style = (0, react_1.useMemo)(() => {
        // Higher row numbers should be at the bottom
        // e.g. row 4 = z-index 60, row 0 = z-index 100
        const zIndex = 100 - (overlay.row || 0) * 10;
        const isSelected = overlay.id === selectedOverlayId;
        return {
            position: "absolute",
            left: overlay.left,
            top: overlay.top,
            width: overlay.width,
            height: overlay.height,
            transform: `rotate(${overlay.rotation || 0}deg)`,
            transformOrigin: "center center",
            zIndex,
            pointerEvents: isSelected ? "all" : "none",
        };
    }, [
        overlay.height,
        overlay.left,
        overlay.top,
        overlay.width,
        overlay.rotation,
        overlay.row,
        overlay.id,
        selectedOverlayId,
    ]);
    /**
     * Special handling for sound overlays
     * Sound overlays don't need positioning or visual representation,
     * they just need to be sequenced correctly
     */
    if (overlay.type === "sound") {
        return (react_1.default.createElement(remotion_1.Sequence, { key: overlay.id, from: overlay.from, durationInFrames: overlay.durationInFrames },
            react_1.default.createElement(layer_content_1.LayerContent, { overlay: overlay, baseUrl: baseUrl })));
    }
    /**
     * Standard layer rendering for visual elements
     * Wraps the content in a Sequence for timing control and
     * a positioned div for layout management
     */
    return (react_1.default.createElement(remotion_1.Sequence, { key: overlay.id, from: overlay.from, durationInFrames: overlay.durationInFrames, layout: "none" },
        react_1.default.createElement("div", { style: style },
            react_1.default.createElement(layer_content_1.LayerContent, { overlay: overlay, baseUrl: baseUrl }))));
};
exports.Layer = Layer;
