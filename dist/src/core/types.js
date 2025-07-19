"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRequest = exports.RenderRequest = exports.CompositionProps = exports.OverlayType = void 0;
// Define overlay types enum
var OverlayType;
(function (OverlayType) {
    OverlayType["TEXT"] = "text";
    OverlayType["IMAGE"] = "image";
    OverlayType["SHAPE"] = "shape";
    OverlayType["VIDEO"] = "clip";
    OverlayType["SOUND"] = "sound";
    OverlayType["CAPTION"] = "caption";
    OverlayType["MY_EDITS"] = "My Edits";
    OverlayType["TEXT_ELEMENTS"] = "Text Panel";
    OverlayType["CAPTIONS"] = "Captions Panel";
    OverlayType["MY_UPLOADS"] = "My Uploads";
    OverlayType["SOUNDS"] = "Audio Panel";
    OverlayType["SHAPES"] = "Shapes Panel";
    OverlayType["PEXEL_CLIPS"] = "Pexel Clips";
    OverlayType["PEXEL_IMAGES"] = "Pexel Images";
    OverlayType["RENDER_HISTORY"] = "Render History";
    OverlayType["SHARING_MANAGEMENT"] = "Sharing Management";
    OverlayType["LOCAL_DIR"] = "local-dir";
    OverlayType["STICKER"] = "sticker";
})(OverlayType || (exports.OverlayType = OverlayType = {}));
const zod_1 = require("zod");
// Zod schema for composition props
exports.CompositionProps = zod_1.z.object({
    overlays: zod_1.z.array(zod_1.z.any()), // Replace with your actual Overlay type
    durationInFrames: zod_1.z.number(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
    fps: zod_1.z.number(),
    src: zod_1.z.string(),
});
// Other types remain the same
exports.RenderRequest = zod_1.z.object({
    id: zod_1.z.string(),
    inputProps: exports.CompositionProps,
});
exports.ProgressRequest = zod_1.z.object({
    bucketName: zod_1.z.string(),
    id: zod_1.z.string(),
});
