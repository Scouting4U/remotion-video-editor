"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiStickers = exports.objectsEmojis = exports.emotionsEmojis = exports.smileysEmojis = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const EmojiStickerComponent = ({ overlay, isSelected, onUpdate, emoji = "😊", }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const scale = overlay.styles.scale || 1;
    // Calculate size based on scale
    const baseSize = Math.min(overlay.width, overlay.height);
    const fontSize = baseSize * scale;
    // Handle size updates
    react_1.default.useEffect(() => {
        if (onUpdate) {
            onUpdate({
                width: fontSize,
                height: fontSize,
            });
        }
    }, [fontSize, onUpdate]);
    // Remotion animation interpolation
    const opacity = (0, remotion_1.interpolate)(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });
    const animatedScale = (0, remotion_1.interpolate)(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });
    return (react_1.default.createElement("div", { style: {
            fontSize: `${fontSize}px`,
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: isSelected ? "2px solid #0088ff" : "none",
            borderRadius: "8px",
            opacity,
            transform: `scale(${animatedScale})`,
        } }, emoji));
};
// Define different emoji templates with various categories
const createEmojiTemplate = (id, name, emoji) => ({
    config: {
        id: `emoji-${id}`,
        name: `${name}`,
        category: "Emojis",
        defaultProps: {
            emoji,
            styles: {
                scale: 1,
            },
        },
        // Add a thumbnail to help with preview
        thumbnail: emoji,
    },
    Component: EmojiStickerComponent,
});
// Create various emoji templates grouped by category
exports.smileysEmojis = [
    createEmojiTemplate("grin", "Grinning Face", "😀"),
    createEmojiTemplate("joy", "Face with Tears of Joy", "😂"),
    createEmojiTemplate("heart-eyes", "Heart Eyes", "😍"),
    createEmojiTemplate("cool", "Cool Face", "😎"),
];
exports.emotionsEmojis = [
    createEmojiTemplate("love", "Red Heart", "❤️"),
    createEmojiTemplate("fire", "Fire", "🔥"),
    createEmojiTemplate("hundred", "100 Points", "💯"),
    createEmojiTemplate("sparkles", "Sparkles", "✨"),
];
exports.objectsEmojis = [
    createEmojiTemplate("star", "Star", "⭐"),
    createEmojiTemplate("gift", "Gift", "🎁"),
    createEmojiTemplate("balloon", "Balloon", "🎈"),
    createEmojiTemplate("party", "Party Popper", "🎉"),
];
// Export all emoji stickers
exports.emojiStickers = [
    ...exports.smileysEmojis,
    ...exports.emotionsEmojis,
    ...exports.objectsEmojis,
];
