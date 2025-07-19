"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatesForCategory = exports.getStickerCategories = exports.templateMap = exports.templatesByCategory = void 0;
const discount_sticker_1 = require("./discount-sticker");
const flash_sale_1 = require("./flash-sale");
const social_proof_1 = require("./social-proof");
// Import other sticker templates here
// This array will grow as you add more sticker templates
const templates = [
    discount_sticker_1.discountSticker,
    flash_sale_1.flashSaleSticker,
    social_proof_1.socialProofSticker,
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
