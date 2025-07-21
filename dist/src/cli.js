#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const videoExtractor_1 = require("./videoExtractor");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
// Get version from package.json
const packageJson = require("../../package.json");
const program = new commander_1.Command();
program
    .name("videoextract")
    .description("CLI tool to extract videos from JSON timeline files")
    .version(packageJson.version);
program
    .command("extract")
    .description("Extract video from a JSON timeline file")
    .argument("<jsonFile>", "Path to the JSON timeline file")
    .option("-o, --output <path>", "Output directory (defaults to Downloads folder)")
    .option("-n, --name <name>", "Output video filename (without extension)", "video")
    .action(async (jsonFile, options) => {
    try {
        // Resolve the JSON file path
        const timelineFilePath = path_1.default.resolve(jsonFile);
        // Set default output directory to Downloads folder
        const outputDir = options.output || path_1.default.join(os_1.default.homedir(), "Downloads");
        const outputFilename = `${options.name}.mp4`;
        const outputPath = path_1.default.join(outputDir, outputFilename);
        console.log(`🎬 Starting video extraction...`);
        console.log(`📄 Timeline file: ${timelineFilePath}`);
        console.log(`📁 Output location: ${outputPath}`);
        await (0, videoExtractor_1.extractVideo)(timelineFilePath, outputPath);
        console.log(`✅ Video extraction completed!`);
        console.log(`🎥 Video saved to: ${outputPath}`);
    }
    catch (error) {
        console.error("❌ Error during video extraction:", error);
        process.exit(1);
    }
});
program.parse();
