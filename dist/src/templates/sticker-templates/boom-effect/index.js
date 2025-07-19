"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomEffect = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const BoomEffectComponent = ({ overlay, text = "BOOM!", particleCount = 150, baseColor = "200", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const particles = Array.from({ length: particleCount }).map((_, i) => {
        const baseAngle = (i / particleCount) * Math.PI * 2;
        const rotationSpeed = 0.015;
        const rotatingAngle = baseAngle + frame * rotationSpeed;
        const scale = (0, remotion_1.spring)({
            frame,
            fps,
            from: 0,
            to: (0, remotion_1.random)(i) * 0.8 + 0.2,
            config: { mass: 0.2, damping: 8 },
        });
        const distance = (0, remotion_1.spring)({
            frame,
            fps,
            from: 0,
            to: Math.min(overlay.width, overlay.height) * 0.45 + (0, remotion_1.random)(i) * 30,
            config: { mass: 0.3, damping: 8 },
        });
        const x = Math.cos(rotatingAngle) * distance;
        const y = Math.sin(rotatingAngle) * distance;
        const opacity = Math.max(0, 1 - frame / 45);
        return { x, y, opacity, scale };
    });
    return (react_1.default.createElement("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: Math.min(overlay.width, overlay.height) * 0.9,
            height: Math.min(overlay.width, overlay.height) * 0.9,
        } },
        react_1.default.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) scale(${Math.min(1.2, frame / 8)})`,
                    fontSize: `${Math.min(overlay.width, overlay.height) * 0.16}px`,
                    fontWeight: "900",
                    color: "white",
                    textShadow: "0 0 15px rgba(255,255,255,0.7)",
                    zIndex: 2,
                } }, text),
            particles.map((particle, i) => (react_1.default.createElement("div", { key: i, style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`,
                    width: "8px",
                    height: "8px",
                    backgroundColor: `hsl(${Number(baseColor) + (i / particleCount) * 30}, 100%, 65%)`,
                    borderRadius: "50%",
                    opacity: particle.opacity,
                    boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                } }))))));
};
exports.boomEffect = {
    config: {
        id: "boom-effect",
        name: "Boom Effect",
        category: "Default",
        layout: "single",
        defaultProps: {
            text: "BOOM!",
            particleCount: 150,
            baseColor: "200",
        },
        isPro: true,
    },
    Component: BoomEffectComponent,
};
