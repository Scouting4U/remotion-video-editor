"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPaddingControls = void 0;
const react_1 = __importDefault(require("react"));
/**
 * MediaPaddingControls Component
 *
 * A reusable component for controlling padding and padding background color
 * for both video and image overlays.
 *
 * @component
 * @param {MediaPaddingControlsProps} props - Component props
 * @returns {JSX.Element} UI controls for padding and padding background
 */
const MediaPaddingControls = ({ localOverlay, handleStyleChange, }) => {
    var _a, _b;
    // Extract current padding value or set default
    const paddingValue = ((_a = localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.styles) === null || _a === void 0 ? void 0 : _a.padding) || "0px";
    const paddingMatch = paddingValue.match(/^(\d+)px$/);
    const numericPadding = paddingMatch ? parseInt(paddingMatch[1], 10) : 0;
    // Extract current padding background color or set default
    const paddingBackgroundColor = ((_b = localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.styles) === null || _b === void 0 ? void 0 : _b.paddingBackgroundColor) || "transparent";
    return (react_1.default.createElement("div", { className: "space-y-4" },
        react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("label", { className: "text-xs text-gray-600 dark:text-gray-400" }, "Padding"),
                react_1.default.createElement("span", { className: "text-xs text-gray-600 dark:text-gray-400 min-w-[40px] text-right" }, paddingValue)),
            react_1.default.createElement("input", { type: "range", min: "0", max: "100", step: "5", value: numericPadding, onChange: (e) => handleStyleChange({ padding: `${e.target.value}px` }), className: "w-full accent-blue-500 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" })),
        react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("label", { className: "text-xs text-gray-600 dark:text-gray-400" }, "Padding Background"),
            react_1.default.createElement("div", { className: "flex items-center gap-2" },
                react_1.default.createElement("input", { type: "color", value: paddingBackgroundColor === "transparent"
                        ? "#ffffff"
                        : paddingBackgroundColor, onChange: (e) => handleStyleChange({ paddingBackgroundColor: e.target.value }), className: "w-8 h-8 border border-gray-200 dark:border-gray-700 rounded-md p-0.5 cursor-pointer" }),
                react_1.default.createElement("input", { type: "text", value: paddingBackgroundColor, onChange: (e) => handleStyleChange({ paddingBackgroundColor: e.target.value }), placeholder: "transparent", className: "flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs p-2 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-gray-900 dark:text-gray-100" }),
                paddingBackgroundColor !== "transparent" && (react_1.default.createElement("button", { onClick: () => handleStyleChange({ paddingBackgroundColor: "transparent" }), className: "text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" }, "Clear"))))));
};
exports.MediaPaddingControls = MediaPaddingControls;
