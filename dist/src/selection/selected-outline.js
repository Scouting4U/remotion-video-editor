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
exports.SelectionOutline = void 0;
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const resize_handle_1 = require("./resize-handle");
const types_1 = require("../core/types");
const rotate_handle_1 = require("./rotate-handle");
/**
 * SelectionOutline is a component that renders a draggable, resizable outline around selected overlays.
 * It provides visual feedback and interaction handles for manipulating overlay elements.
 *
 * @component
 * @param {Object} props
 * @param {Overlay} props.overlay - The overlay object containing position, size, and other properties
 * @param {Function} props.changeOverlay - Callback to update overlay properties
 * @param {Function} props.setSelectedOverlayId - Function to update the currently selected overlay
 * @param {number|null} props.selectedOverlayId - ID of the currently selected overlay
 * @param {boolean} props.isDragging - Whether the overlay is currently being dragged
 */
const SelectionOutline = ({ overlay, changeOverlay, setSelectedOverlayId, selectedOverlayId, isDragging, }) => {
    const scale = (0, remotion_1.useCurrentScale)();
    const scaledBorder = Math.ceil(1 / scale);
    const [hovered, setHovered] = react_1.default.useState(false);
    const onMouseEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onMouseLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const isSelected = overlay.id === selectedOverlayId;
    const style = (0, react_1.useMemo)(() => {
        // Selection outlines should match layer stacking
        // But start at 1000 to be above content
        // e.g. row 4 = z-index 960, row 0 = z-index 1000
        const baseZIndex = 1000 - (overlay.row || 0) * 10;
        // Selected items get an additional boost
        const selectionBoost = isSelected ? 1000 : 0;
        const zIndex = baseZIndex + selectionBoost;
        return {
            width: Number.isFinite(overlay.width) ? overlay.width : 0,
            height: Number.isFinite(overlay.height) ? overlay.height : 0,
            left: overlay.left,
            top: overlay.top,
            position: "absolute",
            outline: (hovered && !isDragging) || isSelected
                ? `${scaledBorder}px solid #3B8BF2`
                : undefined,
            transform: `rotate(${overlay.rotation || 0}deg)`,
            transformOrigin: "center center",
            userSelect: "none",
            touchAction: "none",
            zIndex,
            pointerEvents: "all",
            // hovered || isDragging ? "all" : isSelected ? "none" : "all",
            cursor: "pointer",
        };
    }, [overlay, hovered, isDragging, isSelected, scaledBorder, overlay.row]);
    const startDragging = (0, react_1.useCallback)((e) => {
        const initialX = e.clientX;
        const initialY = e.clientY;
        const onPointerMove = (pointerMoveEvent) => {
            const offsetX = (pointerMoveEvent.clientX - initialX) / scale;
            const offsetY = (pointerMoveEvent.clientY - initialY) / scale;
            changeOverlay(overlay.id, (o) => {
                return {
                    ...o,
                    left: Math.round(overlay.left + offsetX),
                    top: Math.round(overlay.top + offsetY),
                    isDragging: true,
                };
            });
        };
        const onPointerUp = () => {
            changeOverlay(overlay.id, (o) => {
                return {
                    ...o,
                    isDragging: false,
                };
            });
            window.removeEventListener("pointermove", onPointerMove);
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp, {
            once: true,
        });
    }, [overlay, scale, changeOverlay]);
    const onPointerDown = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        if (e.button !== 0) {
            return;
        }
        setSelectedOverlayId(overlay.id);
        startDragging(e);
    }, [overlay.id, setSelectedOverlayId, startDragging]);
    if (overlay.type === types_1.OverlayType.SOUND) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { onPointerDown: onPointerDown, onPointerEnter: onMouseEnter, onPointerLeave: onMouseLeave, style: style }, isSelected ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(resize_handle_1.ResizeHandle, { overlay: overlay, setOverlay: changeOverlay, type: "top-left" }),
            react_1.default.createElement(resize_handle_1.ResizeHandle, { overlay: overlay, setOverlay: changeOverlay, type: "top-right" }),
            react_1.default.createElement(resize_handle_1.ResizeHandle, { overlay: overlay, setOverlay: changeOverlay, type: "bottom-left" }),
            react_1.default.createElement(resize_handle_1.ResizeHandle, { overlay: overlay, setOverlay: changeOverlay, type: "bottom-right" }),
            react_1.default.createElement(rotate_handle_1.RotateHandle, { overlay: overlay, setOverlay: changeOverlay, scale: scale }))) : null)));
};
exports.SelectionOutline = SelectionOutline;
