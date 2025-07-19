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
exports.CaptionTimeline = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("../../ui/card");
/**
 * Formats milliseconds into a readable time string (HH:MM:SS)
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string
 */
const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, "0")}:${(minutes % 60)
        .toString()
        .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
};
/**
 * CaptionTimeline Component
 *
 * @component
 * @description
 * Provides an interface for editing and managing caption timing and content.
 * Features include:
 * - Auto-scrolling to active caption
 * - Real-time caption text editing
 * - Visual feedback for active/upcoming/past captions
 * - Automatic word timing distribution
 *
 * The component handles both the visual representation and editing
 * functionality for caption sequences.
 *
 * @example
 * ```tsx
 * <CaptionTimeline
 *   localOverlay={captionOverlay}
 *   setLocalOverlay={handleOverlayUpdate}
 *   currentMs={1000}
 * />
 * ```
 */
const CaptionTimeline = ({ localOverlay, setLocalOverlay, currentMs, }) => {
    var _a;
    const containerRef = (0, react_1.useRef)(null);
    const activeCaptionRef = (0, react_1.useRef)(null);
    const lastScrolledCaptionIndex = (0, react_1.useRef)(-1);
    // Improved scrolling logic
    (0, react_1.useEffect)(() => {
        if (!containerRef.current ||
            !activeCaptionRef.current ||
            !(localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.captions))
            return;
        const activeIndex = localOverlay.captions.findIndex((caption) => currentMs >= caption.startMs && currentMs < caption.endMs);
        // Only scroll if we've moved to a different caption
        if (activeIndex !== -1 &&
            activeIndex !== lastScrolledCaptionIndex.current) {
            const container = containerRef.current;
            const activeElement = activeCaptionRef.current;
            const containerHeight = container.clientHeight;
            const elementTop = activeElement.offsetTop;
            const elementHeight = activeElement.clientHeight;
            // Calculate the ideal scroll position to center the element
            const scrollTo = elementTop - containerHeight / 2 + elementHeight / 2;
            container.scrollTo({
                top: scrollTo,
                behavior: "smooth",
            });
            lastScrolledCaptionIndex.current = activeIndex;
        }
    }, [currentMs, localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.captions]);
    const handleCaptionTextChange = (captionIndex, newText) => {
        if (!(localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.captions))
            return;
        const newCaptions = [...localOverlay.captions];
        const currentCaption = newCaptions[captionIndex];
        const words = newText.split(/\s+/).filter((word) => word.length > 0);
        const captionDuration = currentCaption.endMs - currentCaption.startMs;
        const wordDuration = words.length > 0 ? captionDuration / words.length : 0;
        const newWords = words.map((word, idx) => ({
            word,
            startMs: Math.round(currentCaption.startMs + idx * wordDuration),
            endMs: Math.round(currentCaption.startMs + (idx + 1) * wordDuration),
            confidence: 1,
        }));
        newCaptions[captionIndex] = {
            ...currentCaption,
            text: newText.trim(),
            words: newWords,
        };
        setLocalOverlay({
            ...localOverlay,
            captions: newCaptions,
        });
    };
    return (react_1.default.createElement("div", { className: "space-y-2 max-h-screen overflow-y-auto scrollbar-none scrollbar-hide", ref: containerRef }, (_a = localOverlay === null || localOverlay === void 0 ? void 0 : localOverlay.captions) === null || _a === void 0 ? void 0 : _a.map((caption, index) => {
        const isActive = currentMs >= caption.startMs && currentMs < caption.endMs;
        const isUpcoming = currentMs < caption.startMs;
        const isPast = currentMs >= caption.endMs;
        return (react_1.default.createElement(card_1.Card, { key: index, ref: isActive ? activeCaptionRef : undefined, className: `group transition-all duration-200 rounded-sm 
              ${isActive
                ? "border-2 dark:bg-sky-950 dark:border-sky-700 dark:ring-sky-700/20 bg-sky-100 border-sky-600 ring-2 ring-sky-200"
                : isUpcoming || isPast
                    ? "border dark:bg-gray-900 dark:border-gray-800 bg-gray-50 border-gray-200 opacity-75"
                    : "dark:bg-gray-950 dark:hover:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700 bg-white hover:bg-gray-50/80 border-gray-200 hover:border-gray-300"}` },
            react_1.default.createElement(card_1.CardContent, { className: "pl-3 pr-3 pt-3 space-y-2 pb-1 rounded-sm" },
                react_1.default.createElement("div", { className: "flex justify-between items-center" },
                    react_1.default.createElement("div", { className: "text-[8px] text-gray-500 dark:text-gray-400 flex gap-2 mx-2" },
                        react_1.default.createElement("span", null,
                            "Start: ",
                            formatTime(caption.startMs))),
                    react_1.default.createElement("div", { className: "text-[8px] text-gray-500 dark:text-gray-400" },
                        caption.text.length,
                        " chars")),
                react_1.default.createElement("textarea", { value: caption.text, onChange: (e) => handleCaptionTextChange(index, e.target.value), className: `w-full rounded-sm p-2.5
                  text-sm focus:outline-none focus:ring-1 
                  focus:ring-sky-500/50 border resize-none min-h-[60px] transition-colors
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  ${isActive
                        ? "dark:bg-gray-900 dark:text-gray-100 dark:border-sky-700 bg-white text-gray-900 border-sky-500 ring-1 ring-sky-400/30"
                        : "dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800 dark:hover:border-gray-700 bg-white text-gray-800 border-gray-200 hover:border-gray-300"}
                `, placeholder: "Enter caption text...", style: {
                        height: "auto",
                        overflow: "hidden",
                    }, onInput: (e) => {
                        const target = e.target;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                    } }))));
    })));
};
exports.CaptionTimeline = CaptionTimeline;
