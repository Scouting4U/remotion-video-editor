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
exports.MyComp = void 0;
// src/composition.tsx
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const Layer_1 = require("./core/Layer");
const sorted_outlines_1 = require("./selection/sorted-outlines");
const layerContainer = {
    overflow: "hidden",
    maxWidth: "3000px",
};
const outer = {
    backgroundColor: "#111827",
};
const MyComp = ({ setSelectedOverlayId, selectedOverlayId, changeOverlay, durationInFrames, fps, width, height, baseUrl, timeline, }) => {
    // Get input props which should contain the timeline data
    const inputProps = (0, remotion_1.getInputProps)();
    const actualTimeline = (inputProps === null || inputProps === void 0 ? void 0 : inputProps.timeline) || timeline;
    const onPointerDown = (0, react_1.useCallback)((e) => {
        if (e.button !== 0) {
            return;
        }
        setSelectedOverlayId(null);
    }, [setSelectedOverlayId]);
    const overlays = (actualTimeline === null || actualTimeline === void 0 ? void 0 : actualTimeline.overlays) || [];
    return (react_1.default.createElement(remotion_1.AbsoluteFill, { style: {
            ...outer,
        }, onPointerDown: onPointerDown },
        react_1.default.createElement(remotion_1.AbsoluteFill, { style: layerContainer }, overlays.map((overlay) => {
            return (react_1.default.createElement(Layer_1.Layer, { key: overlay.id, overlay: overlay, selectedOverlayId: selectedOverlayId, baseUrl: baseUrl }));
        })),
        react_1.default.createElement(sorted_outlines_1.SortedOutlines, { selectedOverlayId: selectedOverlayId, overlays: overlays, setSelectedOverlayId: setSelectedOverlayId, changeOverlay: changeOverlay })));
};
exports.MyComp = MyComp;
