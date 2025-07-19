"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLayerContent = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const Inter_1 = require("@remotion/google-fonts/Inter");
const Merriweather_1 = require("@remotion/google-fonts/Merriweather");
const RobotoMono_1 = require("@remotion/google-fonts/RobotoMono");
const VT323_1 = require("@remotion/google-fonts/VT323");
const LeagueSpartan_1 = require("@remotion/google-fonts/LeagueSpartan");
const BungeeInline_1 = require("@remotion/google-fonts/BungeeInline");
const image_layer_content_1 = require("../images/image-layer-content");
// Updated font loading with specific weights and subsets
const { fontFamily: interFontFamily } = (0, Inter_1.loadFont)("normal", {
    weights: ["700"],
});
const { fontFamily: merriweatherFontFamily } = (0, Merriweather_1.loadFont)("normal", {
    weights: ["700"],
    subsets: ["latin"],
});
const { fontFamily: robotoMonoFontFamily } = (0, RobotoMono_1.loadFont)("normal", {
    weights: ["400"],
    subsets: ["latin"],
});
const { fontFamily: vt323FontFamily } = (0, VT323_1.loadFont)("normal", {
    weights: ["400"],
    subsets: ["latin"],
});
const { fontFamily: leagueSpartanFontFamily } = (0, LeagueSpartan_1.loadFont)("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});
const { fontFamily: bungeeInlineFontFamily } = (0, BungeeInline_1.loadFont)("normal", {
    weights: ["400"],
    subsets: ["latin"],
});
// Font family mapping function
const getFontFamily = (fontClass) => {
    switch (fontClass) {
        case "font-sans":
            return interFontFamily;
        case "font-serif":
            return merriweatherFontFamily;
        case "font-mono":
            return robotoMonoFontFamily;
        case "font-retro":
            return vt323FontFamily;
        case "font-league-spartan":
            return leagueSpartanFontFamily;
        case "font-bungee-inline":
            return bungeeInlineFontFamily;
        default:
            return interFontFamily;
    }
};
const TextLayerContent = ({ overlay, }) => {
    var _a, _b, _c, _d;
    const frame = (0, remotion_1.useCurrentFrame)();
    // Calculate if we're in the exit phase (last 30 frames)
    const isExitPhase = frame >= overlay.durationInFrames - 30;
    // Apply enter animation only during entry phase
    const enterAnimation = !isExitPhase && ((_a = overlay.styles.animation) === null || _a === void 0 ? void 0 : _a.enter)
        ? (_b = image_layer_content_1.animationTemplates[overlay.styles.animation.enter]) === null || _b === void 0 ? void 0 : _b.enter(frame, overlay.durationInFrames)
        : {};
    // Apply exit animation only during exit phase
    const exitAnimation = isExitPhase && ((_c = overlay.styles.animation) === null || _c === void 0 ? void 0 : _c.exit)
        ? (_d = image_layer_content_1.animationTemplates[overlay.styles.animation.exit]) === null || _d === void 0 ? void 0 : _d.exit(frame, overlay.durationInFrames)
        : {};
    // Calculate base font size using a more sophisticated approach
    const calculateFontSize = () => {
        const aspectRatio = overlay.width / overlay.height;
        const lines = overlay.content.split("\n");
        const numLines = lines.length;
        const maxLineLength = Math.max(...lines.map((line) => line.length));
        // Base size on container dimensions
        const areaBasedSize = Math.sqrt((overlay.width * overlay.height) / (maxLineLength * numLines));
        let fontSize = areaBasedSize * 1.2; // Scaling factor
        // Adjust for number of lines
        if (numLines > 1) {
            fontSize *= Math.max(0.5, 1 - numLines * 0.1);
        }
        // Adjust for line length
        if (maxLineLength > 20) {
            fontSize *= Math.max(0.6, 1 - (maxLineLength - 20) / 100);
        }
        // Adjust for extreme aspect ratios
        if (aspectRatio > 2 || aspectRatio < 0.5) {
            fontSize *= 0.8;
        }
        // Set minimum and maximum bounds
        return Math.max(12, Math.min(fontSize, (overlay.height / numLines) * 0.8));
    };
    const containerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center", // Center vertically
        textAlign: overlay.styles.textAlign,
        justifyContent: overlay.styles.textAlign === "center"
            ? "center"
            : overlay.styles.textAlign === "right"
                ? "flex-end"
                : "flex-start",
        overflow: "hidden",
        ...(isExitPhase ? exitAnimation : enterAnimation),
    };
    const { ...restStyles } = overlay.styles;
    console.log("OVERLAY", overlay.styles.backgroundColor);
    const textStyle = {
        ...restStyles,
        animation: undefined,
        fontSize: `${calculateFontSize()}px`,
        fontFamily: getFontFamily(overlay.styles.fontFamily),
        maxWidth: "100%",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        lineHeight: "1.2",
        padding: "0.1em",
        ...(isExitPhase ? exitAnimation : enterAnimation),
    };
    return (react_1.default.createElement("div", { style: containerStyle },
        react_1.default.createElement("div", { style: textStyle }, overlay.content)));
};
exports.TextLayerContent = TextLayerContent;
