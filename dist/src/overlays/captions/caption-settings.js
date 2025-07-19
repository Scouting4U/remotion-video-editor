"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptionSettings = exports.defaultCaptionStyles = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const caption_timeline_1 = require("./caption-timeline");
const tabs_1 = require("../../ui/tabs");
/**
 * Default styling configuration for captions
 * Defines the base appearance for all captions including font, size, colors, and highlight effects
 */
exports.defaultCaptionStyles = {
    fontFamily: "Inter, sans-serif",
    fontSize: "2.5rem",
    lineHeight: 1.4,
    textAlign: "center",
    color: "#FFFFFF",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    padding: "24px",
    highlightStyle: {
        backgroundColor: "rgba(20, 184, 166, 0.95)",
        scale: 1.1,
        fontWeight: 600,
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
};
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
const CaptionSettings = ({ localOverlay, setLocalOverlay, currentFrame, }) => {
    const currentMs = (currentFrame / 30) * 1000;
    return (react_1.default.createElement(tabs_1.Tabs, { defaultValue: "captions", className: "w-full" },
        react_1.default.createElement(tabs_1.TabsList, { className: "w-full grid grid-cols-3 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-sm border border-gray-200 dark:border-gray-700 gap-1" },
            react_1.default.createElement(tabs_1.TabsTrigger, { value: "captions", className: "data-[state=active]:bg-blue-500/20 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white \r\n            rounded-sm transition-all duration-200 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50" },
                react_1.default.createElement("span", { className: "flex items-center gap-2 text-xs" },
                    react_1.default.createElement(lucide_react_1.AlignLeft, { className: "w-3 h-3" }),
                    "Captions")),
            react_1.default.createElement(tabs_1.TabsTrigger, { value: "display", className: "data-[state=active]:bg-blue-500/20 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white \r\n            rounded-sm transition-all duration-200 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50" },
                react_1.default.createElement("span", { className: "flex items-center gap-2 text-xs" },
                    react_1.default.createElement(lucide_react_1.PaintBucket, { className: "w-3 h-3" }),
                    "Style")),
            react_1.default.createElement(tabs_1.TabsTrigger, { value: "voice", disabled: true, className: "cursor-not-allowed opacity-50 rounded-sm transition-all duration-200 text-gray-600 dark:text-zinc-400" },
                react_1.default.createElement("span", { className: "flex items-center gap-2 text-xs" },
                    react_1.default.createElement(lucide_react_1.Mic, { className: "w-3 h-3" }),
                    "Voice",
                    react_1.default.createElement("span", { className: "text-[9px] ml-2 text-amber-700 dark:text-amber-400 font-medium bg-amber-100/50 dark:bg-yellow-800/50 rounded-sm px-1 py-0.5" }, "SOON")))),
        react_1.default.createElement(tabs_1.TabsContent, { value: "display", className: "space-y-4 mt-4 focus-visible:outline-none" }),
        react_1.default.createElement(tabs_1.TabsContent, { value: "captions", className: "space-y-4 mt-4 focus-visible:outline-none" },
            react_1.default.createElement(caption_timeline_1.CaptionTimeline, { localOverlay: localOverlay, setLocalOverlay: setLocalOverlay, currentMs: currentMs }))));
};
exports.CaptionSettings = CaptionSettings;
