"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTimeline = void 0;
// src/loadTimeline.ts
const fs_1 = __importDefault(require("fs"));
const loadTimeline = (path) => {
    const raw = fs_1.default.readFileSync(path, "utf-8");
    return JSON.parse(raw);
};
exports.loadTimeline = loadTimeline;
