"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundLayerContent = void 0;
const remotion_1 = require("remotion");
const url_helper_1 = require("../../utils/url-helper");
const react_1 = __importDefault(require("react"));
const SoundLayerContent = ({ overlay, baseUrl, }) => {
    var _a, _b;
    // Determine the audio source URL
    let audioSrc = overlay.src;
    // If it's a relative URL and baseUrl is provided, use baseUrl
    if (overlay.src.startsWith("/") && baseUrl) {
        audioSrc = `${baseUrl}${overlay.src}`;
    }
    // Otherwise use the toAbsoluteUrl helper for relative URLs
    else if (overlay.src.startsWith("/")) {
        audioSrc = (0, url_helper_1.toAbsoluteUrl)(overlay.src);
    }
    return (react_1.default.createElement(remotion_1.Audio, { src: audioSrc, startFrom: overlay.startFromSound || 0, volume: (_b = (_a = overlay.styles) === null || _a === void 0 ? void 0 : _a.volume) !== null && _b !== void 0 ? _b : 1 }));
};
exports.SoundLayerContent = SoundLayerContent;
