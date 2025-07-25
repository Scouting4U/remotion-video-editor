"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shapeStickers = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const CenteredWrapper = ({ children, }) => (react_1.default.createElement("div", { style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    } }, children));
const pulsingCircle = {
    config: {
        id: "pulsing-circle",
        name: "Pulsing Circle",
        category: "Shapes",
        isPro: false,
        defaultProps: {
            size: 64,
            color: "#FF4081",
            pulseSpeed: "normal",
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const scale = (0, remotion_1.interpolate)(frame % 60, [0, 30, 60], [1, 1.2, 1], {
            extrapolateRight: "clamp",
        });
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    width: `${overlay.height || 64}px`,
                    height: `${overlay.height || 64}px`,
                    backgroundColor: "#FF4081",
                    borderRadius: "50%",
                    transform: `scale(${scale})`,
                } })));
    },
};
const spinningSquare = {
    config: {
        id: "spinning-square",
        name: "Spinning Square",
        category: "Shapes",
        isPro: true,
        defaultProps: {
            size: 48,
            color: "#2196F3",
            borderWidth: 4,
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const rotation = (0, remotion_1.interpolate)(frame, [0, 60], [0, 360], {
            extrapolateRight: "clamp",
        });
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    width: `${overlay.height || 48}px`,
                    height: `${overlay.height || 48}px`,
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderColor: "#2196F3",
                    borderRadius: "4px",
                    transform: `rotate(${rotation}deg)`,
                } })));
    },
};
const bouncingTriangle = {
    config: {
        id: "bouncing-triangle",
        name: "Bouncing Triangle",
        category: "Shapes",
        isPro: true,
        defaultProps: {
            size: 56,
            color: "#4CAF50",
            bounceHeight: 10,
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const translateY = (0, remotion_1.interpolate)(frame % 45, [0, 22.5, 45], [0, -15, 0], {
            extrapolateRight: "clamp",
        });
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    width: 0,
                    height: 0,
                    borderLeft: `${(overlay.height || 56) / 2}px solid transparent`,
                    borderRight: `${(overlay.height || 56) / 2}px solid transparent`,
                    borderBottom: `${overlay.height || 56}px solid #4CAF50`,
                    transform: `translateY(${translateY}px)`,
                } })));
    },
};
const expandingHexagon = {
    config: {
        id: "expanding-hexagon",
        name: "Expanding Hexagon",
        category: "Shapes",
        isPro: false,
        defaultProps: {
            size: 52,
            color: "#9C27B0",
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const scale = (0, remotion_1.interpolate)(frame % 75, [0, 37.5, 75], [0.8, 1.1, 0.8], {
            extrapolateRight: "clamp",
        });
        const size = overlay.height || 52;
        const color = "#9C27B0";
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${size}px`,
                    height: `${size * 0.866}px`,
                    backgroundColor: color,
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    transform: `translate(-50%, -50%) scale(${scale})`,
                } })));
    },
};
const morphingStar = {
    config: {
        id: "morphing-star",
        name: "Star",
        category: "Shapes",
        isPro: true,
        defaultProps: {
            size: 60,
            color: "#FFC107",
        },
    },
    Component: ({ overlay }) => {
        const size = overlay.height || 60;
        const color = "#FFC107";
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    transform: "translate(-50%, -50%)",
                } })));
    },
};
const rotatingOctagon = {
    config: {
        id: "rotating-octagon",
        name: "Rotating Octagon",
        category: "Shapes",
        isPro: true,
        defaultProps: {
            size: 58,
            color: "#009688",
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const rotation = (0, remotion_1.interpolate)(frame, [0, 120], [0, 360], {
            extrapolateRight: "clamp",
        });
        const size = overlay.height || 58;
        const color = "#009688";
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                } })));
    },
};
const zigzagDiamond = {
    config: {
        id: "zigzag-diamond",
        name: "Zigzag Diamond",
        category: "Shapes",
        isPro: false,
        defaultProps: {
            size: 54,
            color: "#673AB7",
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const skew = (0, remotion_1.interpolate)(frame % 45, [0, 22.5, 45], [-15, 15, -15], {
            extrapolateRight: "clamp",
        });
        const size = overlay.height || 54;
        const color = "#673AB7";
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    transform: `skew(${skew}deg)`,
                } })));
    },
};
const flashingPentagon = {
    config: {
        id: "flashing-pentagon",
        name: "Flashing Pentagon",
        category: "Shapes",
        isPro: false,
        defaultProps: {
            size: 56,
            color: "#E91E63",
        },
    },
    Component: ({ overlay }) => {
        const frame = (0, remotion_1.useCurrentFrame)();
        const opacity = (0, remotion_1.interpolate)(frame % 30, [0, 15, 30], [1, 0.4, 1], {
            extrapolateRight: "clamp",
        });
        const size = overlay.height || 56;
        const color = "#E91E63";
        return (react_1.default.createElement(CenteredWrapper, null,
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    opacity: opacity,
                    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    transform: "translate(-50%, -50%)",
                } })));
    },
};
exports.shapeStickers = [
    pulsingCircle,
    spinningSquare,
    bouncingTriangle,
    expandingHexagon,
    morphingStar,
    rotatingOctagon,
    zigzagDiamond,
    flashingPentagon,
];
