"use strict";
// Template code for Matrix Rain
/**
 * Free Remotion Template Component
 * ---------------------------------
 * This template is free to use in your projects!
 * Credit appreciated but not required.
 *
 * Created by the team at https://www.reactvideoeditor.com
 *
 * Happy coding and building amazing videos! 🎉
 */
"use client";
// Template code for Matrix Rain
/**
 * Free Remotion Template Component
 * ---------------------------------
 * This template is free to use in your projects!
 * Credit appreciated but not required.
 *
 * Created by the team at https://www.reactvideoeditor.com
 *
 * Happy coding and building amazing videos! 🎉
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrixRain = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const MatrixRainComponent = ({ overlay, backgroundColor = "linear-gradient(45deg, #0a1933, #1e40af)", glowColor = "rgba(59, 130, 246, 0.9)", fontSize = 25, }) => {
    console.log("overlay", overlay);
    const frame = (0, remotion_1.useCurrentFrame)();
    const { width, height } = (0, remotion_1.useVideoConfig)();
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*あいうえお漢字";
    const columnWidth = fontSize * 0.6;
    const columns = Math.floor(width / columnWidth);
    const drops = Array.from({ length: columns * 2 }).map((_, i) => ({
        x: i * columnWidth - columnWidth / 2,
        y: (0, remotion_1.random)(i) * height * 2 - height,
        speed: (0, remotion_1.random)(i) * 8 + 3,
        char: characters[Math.floor((0, remotion_1.random)(i) * characters.length)],
    }));
    return (react_1.default.createElement("div", { style: {
            width: "100%",
            height: "100%",
            background: backgroundColor,
            position: "relative",
            overflow: "hidden",
        } }, drops.map((drop, i) => {
        const y = (drop.y + frame * drop.speed) % height;
        return (react_1.default.createElement("div", { key: i, style: {
                position: "absolute",
                left: drop.x,
                top: y,
                color: `rgba(255, 255, 255, ${1 - (y / height) * 0.6})`,
                fontSize: `${fontSize}px`,
                fontFamily: "monospace",
                fontWeight: "bold",
                textShadow: `0 0 8px ${glowColor}`,
            } }, characters[Math.floor((frame + i) / 5) % characters.length]));
    })));
};
exports.matrixRain = {
    config: {
        id: "matrix-rain",
        name: "Matrix Rain",
        category: "Default",
        layout: "single",
        defaultProps: {
            backgroundColor: "linear-gradient(45deg, #0a1933, #1e40af)",
            textColor: "#FFFFFF",
            glowColor: "rgba(59, 130, 246, 0.9)",
            fontSize: 10,
        },
        isPro: true,
    },
    Component: MatrixRainComponent,
};
