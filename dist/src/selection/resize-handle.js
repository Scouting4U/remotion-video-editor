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
exports.ResizeHandle = exports.MAX_ROWS = void 0;
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const types_1 = require("../core/types");
exports.MAX_ROWS = 8;
const HANDLE_SIZE = 12;
/**
 * ResizeHandle component renders a draggable handle for resizing overlays in the editor.
 * It appears as a small white square with a blue border at the corners of a selected overlay.
 *
 * @component
 * @param {Object} props
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} props.type - Position of the handle
 * @param {Function} props.setOverlay - Callback to update the overlay's properties
 * @param {Overlay} props.overlay - The overlay object being resized
 *
 * Features:
 * - Scales appropriately with zoom level using Remotion's useCurrentScale
 * - Maintains correct z-index based on overlay row position
 * - Supports dragging to resize from any corner
 * - Prevents resizing below 1x1 pixels
 * - Updates overlay dimensions and position in real-time while dragging
 * - Not displayed for sound-type overlays
 */
const ResizeHandle = ({ type, setOverlay, overlay }) => {
    const scale = (0, remotion_1.useCurrentScale)();
    const size = Math.round(HANDLE_SIZE / scale);
    const borderSize = 1 / scale;
    const sizeStyle = (0, react_1.useMemo)(() => {
        const zIndex = (exports.MAX_ROWS - (overlay.row || 0)) * 10 + 20000;
        return {
            position: "absolute",
            height: Number.isFinite(size) ? size : HANDLE_SIZE,
            width: Number.isFinite(size) ? size : HANDLE_SIZE,
            backgroundColor: "white",
            border: `${borderSize}px solid #3B8BF2`,
            zIndex,
            pointerEvents: "all",
        };
    }, [borderSize, size, overlay.row]);
    const margin = -size / 2 - borderSize;
    const style = (0, react_1.useMemo)(() => {
        if (type === "top-left") {
            return {
                ...sizeStyle,
                marginLeft: margin,
                marginTop: margin,
                cursor: "nwse-resize",
            };
        }
        if (type === "top-right") {
            return {
                ...sizeStyle,
                marginTop: margin,
                marginRight: margin,
                right: 0,
                cursor: "nesw-resize",
            };
        }
        if (type === "bottom-left") {
            return {
                ...sizeStyle,
                marginBottom: margin,
                marginLeft: margin,
                bottom: 0,
                cursor: "nesw-resize",
            };
        }
        if (type === "bottom-right") {
            return {
                ...sizeStyle,
                marginBottom: margin,
                marginRight: margin,
                right: 0,
                bottom: 0,
                cursor: "nwse-resize",
            };
        }
        throw new Error("Unknown type: " + JSON.stringify(type));
    }, [margin, sizeStyle, type]);
    const onPointerDown = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        if (e.button !== 0) {
            return;
        }
        const initialX = e.clientX;
        const initialY = e.clientY;
        const onPointerMove = (pointerMoveEvent) => {
            const offsetX = (pointerMoveEvent.clientX - initialX) / scale;
            const offsetY = (pointerMoveEvent.clientY - initialY) / scale;
            const isLeft = type === "top-left" || type === "bottom-left";
            const isTop = type === "top-left" || type === "top-right";
            setOverlay(overlay.id, (i) => {
                const newWidth = overlay.width + (isLeft ? -offsetX : offsetX);
                const newHeight = overlay.height + (isTop ? -offsetY : offsetY);
                const newLeft = overlay.left + (isLeft ? offsetX : 0);
                const newTop = overlay.top + (isTop ? offsetY : 0);
                return {
                    ...i,
                    width: Math.max(1, Math.round(newWidth)),
                    height: Math.max(1, Math.round(newHeight)),
                    left: Math.min(overlay.left + overlay.width - 1, Math.round(newLeft)),
                    top: Math.min(overlay.top + overlay.height - 1, Math.round(newTop)),
                    isDragging: true,
                };
            });
        };
        const onPointerUp = () => {
            setOverlay(overlay.id, (i) => {
                return {
                    ...i,
                    isDragging: false,
                };
            });
            window.removeEventListener("pointermove", onPointerMove);
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp, {
            once: true,
        });
    }, [overlay, scale, setOverlay, type]);
    if (overlay.type === types_1.OverlayType.SOUND) {
        return null;
    }
    return react_1.default.createElement("div", { onPointerDown: onPointerDown, style: style });
};
exports.ResizeHandle = ResizeHandle;
