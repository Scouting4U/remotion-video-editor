"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerRenderer = void 0;
const react_1 = __importDefault(require("react"));
const loader_1 = require("./loader");
const StickerRenderer = ({ overlay, isSelected, onUpdate, }) => {
    const template = loader_1.templateMap[overlay.content];
    if (!template) {
        console.warn(`No sticker template found for id: ${overlay.content}`);
        return null;
    }
    const { Component } = template;
    const props = {
        ...template.config.defaultProps,
        overlay,
        isSelected,
        onUpdate,
    };
    return react_1.default.createElement(Component, { ...props });
};
exports.StickerRenderer = StickerRenderer;
