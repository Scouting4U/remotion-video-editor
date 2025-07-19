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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTimeline = exports.extractVideo = void 0;
// src/index.ts - Main library export
var videoExtractor_1 = require("./videoExtractor");
Object.defineProperty(exports, "extractVideo", { enumerable: true, get: function () { return videoExtractor_1.extractVideo; } });
var loadTimeline_1 = require("./loadTimeline");
Object.defineProperty(exports, "loadTimeline", { enumerable: true, get: function () { return loadTimeline_1.loadTimeline; } });
// Re-export types
__exportStar(require("./types"), exports);
