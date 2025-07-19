"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedOutlines = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const selected_outline_1 = require("./selected-outline");
/**c
 * Reorders overlays to ensure selected overlay appears on top of others
 * @param overlays - Array of overlay objects to sort
 * @param selectedOverlayId - ID of the currently selected overlay
 * @returns Reordered array with selected overlay at the end (top)
 */
const displaySelectedOverlayOnTop = (overlays, selectedOverlayId) => {
    const selectedOverlays = overlays.filter((overlay) => overlay.id === selectedOverlayId);
    const unselectedOverlays = overlays.filter((overlay) => overlay.id !== selectedOverlayId);
    return [...unselectedOverlays, ...selectedOverlays];
};
/**
 * Renders a sorted list of selection outlines for overlays
 * The selected overlay is always rendered last (on top)
 * Each outline is wrapped in a Remotion Sequence component for timeline positioning
 *
 * @param props
 * @param props.overlays - Array of overlay objects to render
 * @param props.selectedOverlayId - ID of currently selected overlay
 * @param props.changeOverlay - Callback to modify an overlay's properties
 * @param props.setSelectedOverlayId - State setter for selected overlay ID
 */
const SortedOutlines = ({ overlays, selectedOverlayId, changeOverlay, setSelectedOverlayId }) => {
    const overlaysToDisplay = react_1.default.useMemo(() => displaySelectedOverlayOnTop(overlays, selectedOverlayId), [overlays, selectedOverlayId]);
    const isDragging = react_1.default.useMemo(() => overlays.some((overlay) => overlay.isDragging), [overlays]);
    return overlaysToDisplay.map((overlay) => {
        return (react_1.default.createElement(remotion_1.Sequence, { key: overlay.id, from: overlay.from, durationInFrames: overlay.durationInFrames, layout: "none" },
            react_1.default.createElement(selected_outline_1.SelectionOutline, { changeOverlay: changeOverlay, overlay: overlay, setSelectedOverlayId: setSelectedOverlayId, selectedOverlayId: selectedOverlayId, isDragging: isDragging })));
    });
};
exports.SortedOutlines = SortedOutlines;
