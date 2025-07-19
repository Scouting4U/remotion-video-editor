"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.circularProgress = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const CircularProgressComponent = ({ overlay, primaryColor = "#3b82f6", secondaryColor = "#1e3a8a", backgroundColor = "rgba(255, 255, 255, 0.1)", dotColor = "#3b82f6", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    //   const { fps } = useVideoConfig();
    // Calculate progress based on frame
    const progress = (0, remotion_1.interpolate)(frame % 90, [0, 90], [0, 100], {
        extrapolateRight: "clamp",
    });
    // Calculate rotation for the loading effect
    const rotation = (frame * 4) % 360;
    // Calculate radius and circumference
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    // Pulse effect
    const pulse = 1 + Math.sin(frame / 10) * 0.05;
    return (react_1.default.createElement("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        } },
        react_1.default.createElement("div", { style: {
                position: "relative",
                width: Math.min(overlay.width, overlay.height) * 0.9,
                height: Math.min(overlay.width, overlay.height) * 0.9,
                transform: `scale(${pulse})`,
            } },
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 200 200", style: {
                    position: "absolute",
                    transform: "rotate(-90deg)",
                } },
                react_1.default.createElement("circle", { cx: "100", cy: "100", r: radius, fill: "none", stroke: backgroundColor, strokeWidth: "12" })),
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 200 200", style: {
                    position: "absolute",
                    transform: "rotate(-90deg)",
                } },
                react_1.default.createElement("circle", { cx: "100", cy: "100", r: radius, fill: "none", stroke: primaryColor, strokeWidth: "12", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, strokeLinecap: "round" }),
                react_1.default.createElement("defs", null,
                    react_1.default.createElement("linearGradient", { id: "progressGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                        react_1.default.createElement("stop", { offset: "0%", stopColor: primaryColor }),
                        react_1.default.createElement("stop", { offset: "100%", stopColor: secondaryColor })))),
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 200 200", style: {
                    position: "absolute",
                    transform: `rotate(${rotation}deg)`,
                } },
                react_1.default.createElement("circle", { cx: "100", cy: "20", r: "8", fill: dotColor })),
            react_1.default.createElement("div", { style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: `${overlay.height * 0.15}px`,
                    fontWeight: "bold",
                    color: "white",
                } },
                Math.round(progress),
                "%"))));
};
exports.circularProgress = {
    config: {
        id: "circular-progress",
        name: "Circular Progress",
        category: "Default",
        layout: "single",
        defaultProps: {
            primaryColor: "#3b82f6",
            secondaryColor: "#1e3a8a",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            dotColor: "#3b82f6",
        },
        isPro: true,
    },
    Component: CircularProgressComponent,
};
