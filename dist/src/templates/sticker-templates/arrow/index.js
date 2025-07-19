"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrow = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const ArrowComponent = ({ overlay, color = "#3B82F6", direction = "right", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    // Smoother animation progress
    const progress = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
        easing: (t) => t * t * (3 - 2 * t),
    });
    // Refined subtle bounce effect
    const bounce = (0, remotion_1.interpolate)(frame % 90, [0, 45, 90], [0, 6, 0], {
        extrapolateRight: "clamp",
        easing: (t) => Math.sin(t * Math.PI * 0.5),
    });
    // Adjusted proportions
    const baseSize = Math.min(overlay.width, overlay.height);
    const width = Math.min(baseSize * 0.7, overlay.width * 0.5);
    const height = width * 0.35; // Slightly thinner arrow
    const borderWidth = height * 0.08; // Much thinner border
    // Refined arrow path
    const arrowPath = `
    M ${width * 0.15},${height * 0.3}
    L ${width * 0.15},${height * 0.7}
    L ${width * 0.7},${height * 0.7}
    L ${width * 0.7},${height * 0.9}
    L ${width * 0.95},${height * 0.5}
    L ${width * 0.7},${height * 0.1}
    L ${width * 0.7},${height * 0.3}
    Z
  `;
    // Rotation based on direction
    const rotationMap = {
        right: 0,
        left: 180,
        up: -90,
        down: 90,
    };
    return (react_1.default.createElement("div", { style: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        } },
        react_1.default.createElement("div", { style: {
                transform: `rotate(${rotationMap[direction]}deg) translateX(${bounce}px)`,
            } },
            react_1.default.createElement("svg", { width: width, height: height },
                react_1.default.createElement("path", { d: arrowPath, fill: color, opacity: progress, style: {
                        transformOrigin: "center",
                        transform: `scale(${0.99 + Math.sin(frame * 0.08) * 0.005})`, // More subtle scale
                    } }),
                react_1.default.createElement("path", { d: arrowPath, fill: "none", stroke: "black", strokeWidth: borderWidth, strokeLinejoin: "round", strokeLinecap: "round", opacity: progress })))));
};
exports.arrow = {
    config: {
        id: "arrow",
        name: "Animated Arrow",
        category: "Default",
        layout: "single",
        defaultProps: {
            color: "#3B82F6",
            direction: "right",
        },
        isPro: true,
    },
    Component: ArrowComponent,
};
