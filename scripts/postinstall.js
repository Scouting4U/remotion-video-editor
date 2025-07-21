#!/usr/bin/env node

const os = require("os");

console.log("");
console.log("🎉 VideoExtract has been installed successfully!");
console.log("");
console.log("Usage: videoextract extract <timeline.json>");
console.log("Example: videoextract extract my-timeline.json");
console.log("");
console.log("For more help: videoextract --help");
console.log("");

// Platform-specific information
const platform = os.platform();
if (platform === "win32") {
  console.log("💡 Windows users: Make sure you have Node.js 16+ installed");
} else if (platform === "darwin") {
  console.log("💡 macOS users: Package ready to use!");
} else {
  console.log("💡 Linux users: Package ready to use!");
}
console.log("");
