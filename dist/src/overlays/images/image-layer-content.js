"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageLayerContent = exports.animationTemplates = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const remotion_2 = require("remotion");
const url_helper_1 = require("../../utils/url-helper");
const remotion_3 = require("remotion");
exports.animationTemplates = {
    fade: {
        name: "Fade",
        preview: "Simple fade in/out",
        enter: (frame) => ({
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    slideRight: {
        name: "Slide",
        preview: "Slide in from left",
        isPro: true,
        enter: (frame) => ({
            transform: `translateX(${(0, remotion_3.interpolate)(frame, [0, 15], [-100, 0], {
                extrapolateRight: "clamp",
            })}%)`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `translateX(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, 100], { extrapolateLeft: "clamp" })}%)`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    scale: {
        name: "Scale",
        preview: "Scale in/out",
        enter: (frame) => ({
            transform: `scale(${(0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            })})`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `scale(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], { extrapolateLeft: "clamp" })})`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    bounce: {
        name: "Bounce",
        preview: "Elastic bounce entrance",
        isPro: true,
        enter: (frame) => ({
            transform: `translateY(${(0, remotion_3.interpolate)(frame, [0, 10, 13, 15], [100, -10, 5, 0], { extrapolateRight: "clamp" })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 10], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `translateY(${(0, remotion_3.interpolate)(frame, [duration - 15, duration - 13, duration - 10, duration], [0, 5, -10, 100], { extrapolateLeft: "clamp" })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 10, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    flipX: {
        name: "Flip",
        preview: "3D flip around X axis",
        isPro: true,
        enter: (frame) => ({
            transform: `perspective(400px) rotateX(${(0, remotion_3.interpolate)(frame, [0, 15], [90, 0], { extrapolateRight: "clamp" })}deg)`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 5, 15], [0, 0.7, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `perspective(400px) rotateX(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, -90], { extrapolateLeft: "clamp" })}deg)`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration - 5, duration], [1, 0.7, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    zoomBlur: {
        name: "Zoom",
        preview: "Zoom with blur effect",
        isPro: true,
        enter: (frame) => ({
            transform: `scale(${(0, remotion_3.interpolate)(frame, [0, 15], [1.5, 1], {
                extrapolateRight: "clamp",
            })})`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
            filter: `blur(${(0, remotion_3.interpolate)(frame, [0, 15], [10, 0], {
                extrapolateRight: "clamp",
            })}px)`,
        }),
        exit: (frame, duration) => ({
            transform: `scale(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 1.5], { extrapolateLeft: "clamp" })})`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
            filter: `blur(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, 10], {
                extrapolateLeft: "clamp",
            })}px)`,
        }),
    },
    slideUp: {
        name: "Slide",
        preview: "Modern slide from bottom",
        enter: (frame) => ({
            transform: `translateY(${(0, remotion_3.interpolate)(frame, [0, 15], [30, 0], {
                extrapolateRight: "clamp",
            })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `translateY(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, -30], { extrapolateLeft: "clamp" })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    snapRotate: {
        name: "Snap",
        preview: "Quick rotate with snap",
        isPro: true,
        enter: (frame) => ({
            transform: `rotate(${(0, remotion_3.interpolate)(frame, [0, 8, 12, 15], [-10, 5, -2, 0], {
                extrapolateRight: "clamp",
            })}deg) scale(${(0, remotion_3.interpolate)(frame, [0, 15], [0.8, 1], {
                extrapolateRight: "clamp",
            })})`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 10], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `rotate(${(0, remotion_3.interpolate)(frame, [duration - 15, duration - 12, duration - 8, duration], [0, -2, 5, -10], { extrapolateLeft: "clamp" })}deg) scale(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0.8], {
                extrapolateLeft: "clamp",
            })})`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 10, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
    glitch: {
        name: "Glitch",
        preview: "Digital glitch effect",
        isPro: true,
        enter: (frame) => {
            const progress = (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            });
            // Create glitchy movements at specific keyframes
            const xOffset = frame % 3 === 0 ? (Math.random() * 10 - 5) * (1 - progress) : 0;
            const yOffset = frame % 4 === 0 ? (Math.random() * 8 - 4) * (1 - progress) : 0;
            return {
                transform: `translate(${xOffset}px, ${yOffset}px) scale(${(0, remotion_3.interpolate)(frame, [0, 3, 6, 10, 15], [0.9, 1.05, 0.95, 1.02, 1], { extrapolateRight: "clamp" })})`,
                opacity: (0, remotion_3.interpolate)(frame, [0, 3, 5, 15], [0, 0.7, 0.8, 1], {
                    extrapolateRight: "clamp",
                }),
            };
        },
        exit: (frame, duration) => {
            const progress = (0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, 1], {
                extrapolateLeft: "clamp",
            });
            // Create glitchy movements at specific keyframes
            const xOffset = (duration - frame) % 3 === 0 ? (Math.random() * 10 - 5) * progress : 0;
            const yOffset = (duration - frame) % 4 === 0 ? (Math.random() * 8 - 4) * progress : 0;
            return {
                transform: `translate(${xOffset}px, ${yOffset}px) scale(${(0, remotion_3.interpolate)(frame, [duration - 15, duration - 10, duration - 6, duration - 3, duration], [1, 1.02, 0.95, 1.05, 0.9], { extrapolateLeft: "clamp" })})`,
                opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration - 5, duration - 3, duration], [1, 0.8, 0.7, 0], {
                    extrapolateLeft: "clamp",
                }),
            };
        },
    },
    swipeReveal: {
        name: "Swipe",
        preview: "Reveals content with a swipe",
        isPro: true,
        enter: (frame) => ({
            transform: `translateX(${(0, remotion_3.interpolate)(frame, [0, 15], [0, 0], {
                extrapolateRight: "clamp",
            })}px)`,
            opacity: 1,
            clipPath: `inset(0 ${(0, remotion_3.interpolate)(frame, [0, 15], [100, 0], {
                extrapolateRight: "clamp",
            })}% 0 0)`,
        }),
        exit: (frame, duration) => ({
            transform: `translateX(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, 0], { extrapolateLeft: "clamp" })}px)`,
            opacity: 1,
            clipPath: `inset(0 0 0 ${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, 100], { extrapolateLeft: "clamp" })}%)`,
        }),
    },
    floatIn: {
        name: "Float",
        preview: "Smooth floating entrance",
        enter: (frame) => ({
            transform: `translate(${(0, remotion_3.interpolate)(frame, [0, 15], [10, 0], {
                extrapolateRight: "clamp",
            })}px, ${(0, remotion_3.interpolate)(frame, [0, 15], [-20, 0], {
                extrapolateRight: "clamp",
            })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
            }),
        }),
        exit: (frame, duration) => ({
            transform: `translate(${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, -10], { extrapolateLeft: "clamp" })}px, ${(0, remotion_3.interpolate)(frame, [duration - 15, duration], [0, -20], {
                extrapolateLeft: "clamp",
            })}px)`,
            opacity: (0, remotion_3.interpolate)(frame, [duration - 15, duration], [1, 0], {
                extrapolateLeft: "clamp",
            }),
        }),
    },
};
/**
 * ImageLayerContent Component
 *
 * @component
 * @description
 * Renders an image layer in the video editor with animation support.
 * Features include:
 * - Enter/exit animations
 * - Style customization (fit, position, opacity)
 * - Transform effects
 * - Visual effects (filters, shadows, borders)
 * - Filter presets (retro, vintage, noir, etc.)
 * - Border radius customization
 *
 * The component handles both the visual presentation and animation
 * timing for image overlays.
 *
 * @example
 * ```tsx
 * <ImageLayerContent
 *   overlay={{
 *     src: "path/to/image.jpg",
 *     styles: {
 *       objectFit: "cover",
 *       filter: "contrast(120%) saturate(110%)", // Can be a preset or custom filter
 *       borderRadius: "8px",
 *       animation: {
 *         enter: "fadeIn",
 *         exit: "fadeOut"
 *       }
 *     }
 *   }}
 * />
 * ```
 */
const ImageLayerContent = ({ overlay, baseUrl, }) => {
    var _a, _b, _c, _d;
    const frame = (0, remotion_1.useCurrentFrame)();
    const isExitPhase = frame >= overlay.durationInFrames - 30;
    /**
     * Apply enter animation only during entry phase
     */
    const enterAnimation = !isExitPhase && ((_a = overlay.styles.animation) === null || _a === void 0 ? void 0 : _a.enter)
        ? (_b = exports.animationTemplates[overlay.styles.animation.enter]) === null || _b === void 0 ? void 0 : _b.enter(frame, overlay.durationInFrames)
        : {};
    /**
     * Apply exit animation only during exit phase
     */
    const exitAnimation = isExitPhase && ((_c = overlay.styles.animation) === null || _c === void 0 ? void 0 : _c.exit)
        ? (_d = exports.animationTemplates[overlay.styles.animation.exit]) === null || _d === void 0 ? void 0 : _d.exit(frame, overlay.durationInFrames)
        : {};
    /**
     * Combine base styles with current animation phase
     */
    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: overlay.styles.objectFit || "contain",
        objectPosition: overlay.styles.objectPosition,
        opacity: overlay.styles.opacity,
        transform: overlay.styles.transform || "none",
        filter: overlay.styles.filter || "none",
        borderRadius: overlay.styles.borderRadius || "0px",
        boxShadow: overlay.styles.boxShadow || "none",
        border: overlay.styles.border || "none",
        ...(isExitPhase ? exitAnimation : enterAnimation),
    };
    /**
     * Create a container style that includes padding and background color
     */
    const containerStyle = {
        width: "100%",
        height: "100%",
        padding: overlay.styles.padding || "0px",
        backgroundColor: overlay.styles.paddingBackgroundColor || "transparent",
        display: "flex", // Use flexbox for centering
        alignItems: "center",
        justifyContent: "center",
    };
    // Determine the image source URL
    let imageSrc = overlay.src;
    // If it's a relative URL and baseUrl is provided, use baseUrl
    if (overlay.src.startsWith("/") && baseUrl) {
        imageSrc = `${baseUrl}${overlay.src}`;
    }
    // Otherwise use the toAbsoluteUrl helper for relative URLs
    else if (overlay.src.startsWith("/")) {
        imageSrc = (0, url_helper_1.toAbsoluteUrl)(overlay.src);
    }
    return (react_1.default.createElement("div", { style: containerStyle },
        react_1.default.createElement(remotion_2.Img, { src: imageSrc, style: imageStyle, alt: "" })));
};
exports.ImageLayerContent = ImageLayerContent;
