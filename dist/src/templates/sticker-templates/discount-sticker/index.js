"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountSticker = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const DiscountStickerComponent = ({ overlay, percentage = 50, backgroundColor = "#3B82F6", textColor = "#FFFFFF", ribbonColor = "#1E40AF", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    // Calculate animations based on current frame
    const entrance = (0, remotion_1.interpolate)(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
    });
    const entranceRotation = (0, remotion_1.interpolate)(frame, [0, 15], [-180, 0], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
    });
    const ribbonFloat = (0, remotion_1.interpolate)(frame % 60, [0, 30, 60], [0, 2, 0], {
        extrapolateRight: "clamp",
    });
    const textPulse = (0, remotion_1.interpolate)(frame % 60, [0, 30, 60], [1, 1.1, 1], {
        extrapolateRight: "clamp",
    });
    const rotation = (0, remotion_1.interpolate)(frame % 50, [0, 49], [0, 360], {
        extrapolateRight: "clamp",
    });
    return (react_1.default.createElement("div", { style: {
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${entrance}) rotate(${entranceRotation}deg)`,
        } },
        react_1.default.createElement("div", { style: {
                width: Math.min(overlay.width, overlay.height) * 0.9,
                height: Math.min(overlay.width, overlay.height) * 0.9,
                borderRadius: "50%",
                backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            } },
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    width: "150%",
                    height: "30px",
                    backgroundColor: ribbonColor,
                    transform: `rotate(-45deg) translateY(${ribbonFloat}px)`,
                    top: "20%",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                } }),
            react_1.default.createElement("div", { style: {
                    color: textColor,
                    fontSize: `${overlay.height * 0.25}px`,
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: 1.2,
                    zIndex: 1,
                    transform: `scale(${textPulse})`,
                } },
                react_1.default.createElement("div", null,
                    percentage,
                    "%"),
                react_1.default.createElement("div", { style: { fontSize: "0.5em" } }, "OFF")),
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `${Math.min(overlay.width, overlay.height) * 0.04}px dashed ${textColor}`,
                    opacity: 0.3,
                    transform: `rotate(${rotation}deg)`,
                } }))));
};
exports.discountSticker = {
    config: {
        id: "discount-circle",
        name: "Discount Circle",
        category: "Default",
        defaultProps: {
            percentage: 50,
            backgroundColor: "#3B82F6",
            textColor: "#FFFFFF",
            ribbonColor: "#1E40AF",
        },
        isPro: true,
    },
    Component: DiscountStickerComponent,
};
