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
exports.socialProofSticker = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const SocialProofComponent = ({ overlay, type = "viewers", baseCount = 100, fluctuationRange = 20, updateInterval = 3000, backgroundColor = "rgba(0, 0, 0, 0.8)", textColor = "#FFFFFF", }) => {
    const [count, setCount] = (0, react_1.useState)(baseCount);
    const [trend, setTrend] = (0, react_1.useState)("up");
    // Simulate live count updates
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            const fluctuation = Math.floor(Math.random() * fluctuationRange);
            const shouldIncrease = Math.random() > 0.4; // 60% chance to increase
            setCount((prev) => {
                const newCount = shouldIncrease
                    ? prev + fluctuation
                    : prev - fluctuation;
                setTrend(shouldIncrease ? "up" : "down");
                return Math.max(0, newCount);
            });
        }, updateInterval);
        return () => clearInterval(interval);
    }, [fluctuationRange, updateInterval]);
    return (react_1.default.createElement(framer_motion_1.motion.div, { style: {
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "12px",
            backgroundColor,
            borderRadius: "8px",
            color: textColor,
            overflow: "hidden",
        }, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } },
        react_1.default.createElement(framer_motion_1.motion.div, { style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
            }, animate: {
                opacity: [0.1, 0.2, 0.1],
            }, transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            } }),
        react_1.default.createElement(framer_motion_1.motion.div, { style: {
                fontSize: `${overlay.height * 0.4}px`,
                marginRight: "8px",
                opacity: 0.9,
            }, animate: {
                scale: [1, 1.1, 1],
            }, transition: {
                duration: 2,
                repeat: Infinity,
            } }, type === "viewers" ? "👀" : "🛍️"),
        react_1.default.createElement("div", { style: { flex: 1 } },
            react_1.default.createElement("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: `${overlay.height * 0.25}px`,
                    fontWeight: "bold",
                } },
                react_1.default.createElement(framer_motion_1.AnimatePresence, { mode: "wait" },
                    react_1.default.createElement(framer_motion_1.motion.span, { key: count, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } }, count)),
                react_1.default.createElement(framer_motion_1.motion.span, { style: {
                        marginLeft: "4px",
                        color: trend === "up" ? "#4CAF50" : "#F44336",
                        fontSize: `${overlay.height * 0.2}px`,
                    }, animate: {
                        y: trend === "up" ? [-2, 0, -2] : [2, 0, 2],
                    }, transition: {
                        duration: 1.5,
                        repeat: Infinity,
                    } }, trend === "up" ? "↑" : "↓")),
            react_1.default.createElement(framer_motion_1.motion.div, { style: {
                    fontSize: `${overlay.height * 0.18}px`,
                    opacity: 0.8,
                } }, type === "viewers" ? "watching now" : "recent purchases"))));
};
exports.socialProofSticker = {
    config: {
        id: "social-proof",
        name: "Live Activity",
        category: "Social",
        defaultProps: {
            type: "viewers",
            baseCount: 100,
            fluctuationRange: 20,
            updateInterval: 3000,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            textColor: "#FFFFFF",
            styles: {
                scale: 1,
            },
        },
        isPro: true,
    },
    Component: SocialProofComponent,
};
