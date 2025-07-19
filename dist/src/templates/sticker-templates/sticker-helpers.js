"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatesForCategory = exports.getStickerCategories = exports.templateMap = exports.templatesByCategory = void 0;
const discount_sticker_1 = require("./discount-sticker");
const emoji_sticker_1 = require("./emoji-sticker");
const shapes_1 = require("./shapes");
const circular_progress_1 = require("./circular-progress");
const card_flip_1 = require("./card-flip");
const audio_visualiser_1 = require("./audio-visualiser");
const matrix_effect_1 = require("./matrix-effect");
const boom_effect_1 = require("./boom-effect");
const bar_chart_1 = require("./bar-chart");
const arrow_1 = require("./arrow");
// Import other sticker templates here
// This array will grow as you add more sticker templates
const templates = [
    discount_sticker_1.discountSticker,
    circular_progress_1.circularProgress,
    audio_visualiser_1.audioVisualiser,
    card_flip_1.cardFlip,
    matrix_effect_1.matrixRain,
    boom_effect_1.boomEffect,
    bar_chart_1.barChart,
    arrow_1.arrow,
    ...emoji_sticker_1.emojiStickers,
    ...shapes_1.shapeStickers,
    // Add other sticker templates here
];
// Group templates by category
exports.templatesByCategory = templates.reduce((acc, template) => {
    const { category } = template.config;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(template);
    return acc;
}, {});
// Create a lookup map for quick access
exports.templateMap = templates.reduce((acc, template) => {
    acc[template.config.id] = template;
    return acc;
}, {});
// Helper to get all available categories
const getStickerCategories = () => Object.keys(exports.templatesByCategory);
exports.getStickerCategories = getStickerCategories;
// Helper to get templates for a category
const getTemplatesForCategory = (category) => exports.templatesByCategory[category] || [];
exports.getTemplatesForCategory = getTemplatesForCategory;
