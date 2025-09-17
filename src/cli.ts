#!/usr/bin/env node

import { Command } from "commander";
import { extractVideo } from "./videoExtractor";
import path from "path";
import os from "os";

// Get version from package.json
const packageJson = require("../../package.json");

const program = new Command();

program
  .name("videoextract")
  .description("CLI tool to extract videos from JSON timeline files")
  .version(packageJson.version);

program
  .command("extract")
  .description("Extract video from a JSON timeline file")
  .argument("<jsonFile>", "Path to the JSON timeline file")
  .option(
    "-o, --output <path>",
    "Output directory (defaults to Downloads folder)"
  )
  .option(
    "-n, --name <name>",
    "Output video filename (without extension)",
    "video"
  )
  .action(async (jsonFile: string, options) => {
    try {
      // Show CLI version at the top

      // Show CLI and Remotion versions at the top
      const remotionVersion = packageJson.dependencies?.remotion || "unknown";
      console.log(`🛠️  videoextract-cli version: ${packageJson.version}`);
      console.log(`🎬 Remotion version: ${remotionVersion}`);

      // Resolve the JSON file path
      const timelineFilePath = path.resolve(jsonFile);

      // Set default output directory to Downloads folder
      const outputDir = options.output || path.join(os.homedir(), "Downloads");
      const outputFilename = `${options.name}.mp4`;
      const outputPath = path.join(outputDir, outputFilename);

      console.log(`🎬 Starting video extraction...`);
      console.log(`📄 Timeline file: ${timelineFilePath}`);
      console.log(`📁 Output location: ${outputPath}`);

      await extractVideo(timelineFilePath, outputPath);

      console.log(`✅ Video extraction completed!`);
      console.log(`🎥 Video saved to: ${outputPath}`);
    } catch (error) {
      console.error("❌ Error during video extraction:", error);
      process.exit(1);
    }
  });

program.parse();
