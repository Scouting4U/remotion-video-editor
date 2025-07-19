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
exports.MediaFilterPresetSelector = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const media_filter_presets_1 = require("../../templates/common/media-filter-presets");
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
const MediaFilterPresetSelector = ({ localOverlay, handleStyleChange }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    // Determine which preset (if any) is currently active
    const getCurrentPresetId = () => {
        var _a;
        const currentFilter = ((_a = localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.styles) === null || _a === void 0 ? void 0 : _a.filter) || "none";
        // If no filter is applied or it's explicitly "none", return "none"
        if (!currentFilter || currentFilter === "none") {
            return "none";
        }
        // Try to find a matching preset
        const matchingPreset = media_filter_presets_1.MEDIA_FILTER_PRESETS.find((preset) => preset.filter === currentFilter);
        // Return the matching preset ID or "custom" if no match is found
        return (matchingPreset === null || matchingPreset === void 0 ? void 0 : matchingPreset.id) || "custom";
    };
    // Get the current preset name for display
    const getCurrentPresetName = () => {
        const currentId = getCurrentPresetId();
        if (currentId === "custom")
            return "Custom";
        const preset = media_filter_presets_1.MEDIA_FILTER_PRESETS.find((p) => p.id === currentId);
        return (preset === null || preset === void 0 ? void 0 : preset.name) || "None";
    };
    // When a new preset is selected, apply its filter
    const handlePresetChange = (presetId) => {
        var _a;
        const selectedPreset = media_filter_presets_1.MEDIA_FILTER_PRESETS.find((preset) => preset.id === presetId);
        if (selectedPreset) {
            // Preserve any brightness adjustments if the user has made them
            let newFilter = selectedPreset.filter;
            // If we're selecting "none", remove all filters
            if (presetId === "none") {
                newFilter = "none";
            }
            // Otherwise, try to preserve brightness from existing filter
            else {
                const currentFilter = (_a = localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.styles) === null || _a === void 0 ? void 0 : _a.filter;
                const brightnessMatch = currentFilter === null || currentFilter === void 0 ? void 0 : currentFilter.match(/brightness\((\d+)%\)/);
                if (brightnessMatch &&
                    brightnessMatch[1] &&
                    !newFilter.includes("brightness") &&
                    newFilter !== "none") {
                    // Add brightness to the new filter if the new filter doesn't already have it
                    newFilter = `${newFilter} brightness(${brightnessMatch[1]}%)`;
                }
            }
            handleStyleChange({ filter: newFilter });
            setIsExpanded(false);
        }
    };
    // Get the content to display in the preview (either video src or image src)
    const getMediaContent = () => {
        if (localOverlay.type === "clip") {
            return localOverlay.content;
        }
        else {
            return localOverlay.src;
        }
    };
    return (react_1.default.createElement("div", { className: "space-y-2" },
        react_1.default.createElement("div", { className: "flex items-center justify-between" },
            react_1.default.createElement("div", { className: "flex items-center gap-1.5" },
                react_1.default.createElement("label", { className: "text-xs text-muted-foreground" }, "Filter Preset"))),
        react_1.default.createElement("button", { onClick: () => setIsExpanded(!isExpanded), className: "flex justify-between items-center w-full bg-background border border-input rounded-md text-xs p-2 hover:border-accent-foreground transition-colors text-foreground" },
            react_1.default.createElement("span", null, getCurrentPresetName()),
            react_1.default.createElement(lucide_react_1.ChevronDown, { className: `w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}` })),
        isExpanded && (react_1.default.createElement("div", { className: "mt-2 grid grid-cols-3 gap-2 bg-background p-2 rounded-md border border-input shadow-sm" }, media_filter_presets_1.MEDIA_FILTER_PRESETS.map((preset) => {
            const isActive = getCurrentPresetId() === preset.id;
            return (react_1.default.createElement("button", { key: preset.id, onClick: () => handlePresetChange(preset.id), className: `relative p-1 rounded-md overflow-hidden flex flex-col items-center transition-all ${isActive ? "ring-2 ring-primary" : "hover:bg-muted"}` },
                react_1.default.createElement("div", { className: "relative h-12 w-full mb-1 rounded overflow-hidden" },
                    react_1.default.createElement("img", { src: getMediaContent(), alt: `${preset.name} preview`, className: "w-full h-full object-cover", style: { filter: preset.filter } }),
                    isActive && (react_1.default.createElement("div", { className: "absolute top-1 right-1 bg-primary rounded-full p-0.5" },
                        react_1.default.createElement(lucide_react_1.Check, { className: "h-3 w-3 text-background" })))),
                react_1.default.createElement("span", { className: "text-[10px] leading-tight text-center" }, preset.name)));
        })))));
};
exports.MediaFilterPresetSelector = MediaFilterPresetSelector;
