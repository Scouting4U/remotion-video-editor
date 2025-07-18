// src/loadTimeline.ts
import fs from "fs";

export const loadTimeline = (path: string) => {
  const raw = fs.readFileSync(path, "utf-8");
  return JSON.parse(raw);
};
