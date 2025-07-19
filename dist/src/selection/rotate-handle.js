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
exports.RotateHandle = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
/**
 * RotateHandle Component
 *
 * A React component that provides rotation functionality for overlay elements.
 * Renders a rotation handle that users can drag to rotate the parent overlay.
 *
 * @component
 * @param {Object} props
 * @param {Overlay} props.overlay - The overlay object to be rotated
 * @param {Function} props.setOverlay - Callback function to update the overlay properties
 * @param {number} [props.scale] - Optional scale factor for the rotation handle
 *
 * @example
 * <RotateHandle
 *   overlay={overlayObject}
 *   setOverlay={(id, updater) => updateOverlay(id, updater)}
 * />
 */
const RotateHandle = ({ overlay, setOverlay }) => {
    /**
     * Handles the start of a rotation gesture and sets up event listeners
     * for tracking the rotation movement.
     *
     * @param {React.PointerEvent} e - The pointer event that initiated the rotation
     */
    const startRotating = (0, react_1.useCallback)((e) => {
        var _a;
        e.stopPropagation();
        const rect = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (!rect)
            return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const getAngle = (x, y) => {
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        };
        const startAngle = getAngle(e.clientX, e.clientY);
        const startRotation = overlay.rotation || 0;
        const onPointerMove = (e) => {
            const currentAngle = getAngle(e.clientX, e.clientY);
            const deltaAngle = currentAngle - startAngle;
            setOverlay(overlay.id, (o) => ({
                ...o,
                rotation: startRotation + deltaAngle,
            }));
        };
        const onPointerUp = () => {
            window.removeEventListener("pointermove", onPointerMove);
        };
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp, { once: true });
    }, [overlay, setOverlay]);
    return (react_1.default.createElement("div", { onPointerDown: startRotating, style: {
            position: "absolute",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            top: "-68px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        } },
        react_1.default.createElement(lucide_react_1.RotateCw, { size: 102, strokeWidth: 2.5, color: "#3B8BF2" })));
};
exports.RotateHandle = RotateHandle;
