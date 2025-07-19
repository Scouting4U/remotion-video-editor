"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardFlip = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const CardFlipComponent = ({ overlay, frontColor = "linear-gradient(45deg, #1e3a8a, #3b82f6)", backColor = "linear-gradient(45deg, #1e3a8a, #3b82f6)", frontText = "Remotion 👋", backText = "Back", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const rotation = (0, remotion_1.spring)({
        frame,
        fps,
        from: 0,
        to: 360,
        config: {
            damping: 15,
            mass: 0.5,
        },
    });
    return (react_1.default.createElement("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
        } },
        react_1.default.createElement("div", { style: {
                width: `${overlay.width}px`,
                height: `${overlay.height}px`,
                transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
                position: "relative",
            } },
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    background: frontColor,
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: `${overlay.height * 0.1}px`,
                    fontWeight: "bold",
                    color: "white",
                } }, frontText),
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    background: backColor,
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: `${overlay.height * 0.1}px`,
                    fontWeight: "bold",
                    color: "white",
                    transform: "rotateY(180deg)",
                } }, backText))));
};
exports.cardFlip = {
    config: {
        id: "card-flip",
        name: "Card Flip",
        category: "Default",
        layout: "double",
        defaultProps: {
            frontColor: "linear-gradient(45deg, #1e3a8a, #3b82f6)",
            backColor: "linear-gradient(45deg, #1e3a8a, #3b82f6)",
            frontText: "React Video Editor!",
            backText: "Flip me!",
        },
        isPro: true,
    },
    Component: CardFlipComponent,
};
