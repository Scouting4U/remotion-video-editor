"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barChart = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const BarChartComponent = ({ overlay, data = [
    { x: 0, y: 50, label: "Jan" },
    { x: 1, y: 80, label: "Feb" },
    { x: 2, y: 30, label: "Mar" },
    { x: 3, y: 70, label: "Apr" },
    { x: 4, y: 45, label: "May" },
    { x: 5, y: 90, label: "Jun" },
    { x: 6, y: 60, label: "Jul" },
    { x: 7, y: 75, label: "Aug" },
    { x: 8, y: 40, label: "Sep" },
    { x: 9, y: 85, label: "Oct" },
], }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    // Color palette for bars
    const colors = [
        "#4361ee",
        "#3a0ca3",
        "#7209b7",
        "#f72585",
        "#4cc9f0",
        "#4895ef",
        "#560bad",
        "#b5179e",
        "#f15bb5",
        "#00b4d8",
    ];
    // Adjust container and chart dimensions
    const containerWidth = (overlay === null || overlay === void 0 ? void 0 : overlay.width) || 900;
    const containerHeight = (overlay === null || overlay === void 0 ? void 0 : overlay.height) || 500;
    const chartWidth = containerWidth * 0.9; // Add some margin
    const chartHeight = containerHeight * 0.85; // Add space for labels
    const padding = Math.min(20, chartWidth * 0.025); // Reduce padding
    // Scale data to fit chart dimensions
    const xScale = (x) => (x / (data.length - 1)) * (chartWidth - padding * 2) + padding;
    const barWidth = ((chartWidth - padding * 2) / data.length) * 0.85;
    // Add dynamic font size calculations
    const baseFontSize = Math.min(containerWidth, containerHeight) * 0.038;
    const labelFontSize = baseFontSize * 0.9;
    const valueFontSize = baseFontSize;
    return (react_1.default.createElement("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, system-ui, sans-serif",
        } },
        react_1.default.createElement("div", { style: {
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: `0px`,
                overflow: "hidden",
            } },
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: `0 0 ${containerWidth} ${containerHeight}`, preserveAspectRatio: "xMidYMid meet" },
                react_1.default.createElement("g", { transform: `translate(${(containerWidth - chartWidth) / 2}, ${(containerHeight - chartHeight) / 2})` },
                    react_1.default.createElement("line", { x1: padding, y1: chartHeight - padding, x2: chartWidth - padding, y2: chartHeight - padding, stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: "2" }),
                    data.map((point, i) => (react_1.default.createElement("text", { key: `x-label-${i}`, x: xScale(point.x), y: chartHeight - padding + 25, textAnchor: "middle", fill: "rgba(255, 255, 255, 0.8)", fontSize: labelFontSize, fontWeight: "500" }, point.label))),
                    data.map((point, i) => {
                        const barHeight = (point.y / 100) * (chartHeight - padding * 2);
                        // Animation that grows bars from bottom
                        const barProgress = (0, remotion_1.interpolate)(frame, [i * 3, 15 + i * 3], [0, 1], { extrapolateRight: "clamp" });
                        const currentHeight = barHeight * barProgress;
                        const currentY = chartHeight - padding - currentHeight;
                        return (react_1.default.createElement("g", { key: `bar-${i}` },
                            react_1.default.createElement("rect", { x: xScale(point.x) - barWidth / 2, y: currentY, width: barWidth, height: currentHeight, fill: colors[i % colors.length], rx: "0", ry: "0", filter: "url(#shadow)" }),
                            react_1.default.createElement("text", { x: xScale(point.x), y: currentY - 10, textAnchor: "middle", fill: "white", fontSize: valueFontSize, fontWeight: "bold", opacity: barProgress > 0.9 ? 1 : 0 }, point.y)));
                    }),
                    react_1.default.createElement("defs", null,
                        react_1.default.createElement("filter", { id: "shadow", x: "-20%", y: "-20%", width: "140%", height: "140%" },
                            react_1.default.createElement("feDropShadow", { dx: "0", dy: "4", stdDeviation: "4", floodOpacity: "0.3" }))))))));
};
exports.barChart = {
    config: {
        id: "bar-chart",
        name: "Bar Chart",
        category: "Default",
        layout: "double",
        defaultProps: {
            data: [
                { x: 0, y: 50, label: "Jan" },
                { x: 1, y: 80, label: "Feb" },
                { x: 2, y: 30, label: "Mar" },
                { x: 3, y: 70, label: "Apr" },
                { x: 4, y: 45, label: "May" },
            ],
            width: 280, // Match the preview width
            height: 140, // Match the preview height
        },
        isPro: true,
    },
    Component: BarChartComponent,
};
