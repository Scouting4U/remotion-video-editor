"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const composition_1 = require("./composition");
const Root = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(remotion_1.Composition, { id: "MyComp", component: composition_1.MyComp, width: 1280, height: 720, fps: 30, durationInFrames: 0, calculateMetadata: ({ props }) => {
                var _a;
                return {
                    durationInFrames: ((_a = props.timeline) === null || _a === void 0 ? void 0 : _a.durationInFrames) || 0,
                    props,
                };
            }, defaultProps: {
                overlays: [],
                timeline: null,
                durationInFrames: 0,
                fps: 30,
                width: 1280,
                height: 720,
                setSelectedOverlayId: () => { },
                selectedOverlayId: null,
                changeOverlay: () => { },
            } })));
};
(0, remotion_1.registerRoot)(Root);
