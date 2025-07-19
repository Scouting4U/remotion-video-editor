"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerLayerContent = exports.templateMap = exports.discountSticker = void 0;
const react_1 = __importStar(require("react"));
const DiscountStickerComponent = ({ overlay, isSelected, }) => {
    const props = overlay.props || {};
    const { percentage = 50, backgroundColor = "#3B82F6", textColor = "#FFFFFF", ribbonColor = "#1E40AF", } = props;
    return (react_1.default.createElement("div", { style: {
            width: "100%",
            height: "100%",
            backgroundColor,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            border: isSelected ? "2px solid white" : "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        } },
        react_1.default.createElement("div", { style: {
                color: textColor,
                fontSize: `${overlay.width * 0.3}px`,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 1,
            } },
            percentage,
            "%",
            react_1.default.createElement("div", { style: {
                    fontSize: `${overlay.width * 0.15}px`,
                    fontWeight: "normal",
                } }, "OFF")),
        react_1.default.createElement("div", { style: {
                position: "absolute",
                bottom: -10,
                right: -10,
                backgroundColor: ribbonColor,
                padding: "4px 8px",
                borderRadius: "4px",
                transform: "rotate(-15deg)",
                color: textColor,
                fontSize: `${overlay.width * 0.12}px`,
            } }, "SAVE")));
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
// For now, we'll just use the discount sticker template
const templates = [
    exports.discountSticker,
    // Add other sticker templates here as they are implemented
];
// Create a lookup map for quick access
exports.templateMap = templates.reduce((acc, template) => {
    acc[template.config.id] = template;
    return acc;
}, {});
exports.StickerLayerContent = (0, react_1.memo)(({ overlay, isSelected, onUpdate }) => {
    const template = exports.templateMap[overlay.content];
    if (!template) {
        console.warn(`No sticker template found for id: ${overlay.content}`);
        return null;
    }
    const { Component } = template;
    const MemoizedComponent = (0, react_1.memo)(Component);
    const props = {
        ...template.config.defaultProps,
        overlay,
        isSelected,
        onUpdate,
    };
    return react_1.default.createElement(MemoizedComponent, { ...props });
}, (prevProps, nextProps) => {
    var _a, _b;
    // Only re-render if these props change
    return (prevProps.overlay.content === nextProps.overlay.content &&
        prevProps.isSelected === nextProps.isSelected &&
        ((_a = prevProps.overlay.styles) === null || _a === void 0 ? void 0 : _a.opacity) === ((_b = nextProps.overlay.styles) === null || _b === void 0 ? void 0 : _b.opacity) &&
        prevProps.overlay.rotation === nextProps.overlay.rotation &&
        prevProps.overlay.width === nextProps.overlay.width &&
        prevProps.overlay.height === nextProps.overlay.height);
});
exports.StickerLayerContent.displayName = "StickerLayerContent";
