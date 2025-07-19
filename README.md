# VideoExtract 🎬

A powerful CLI tool to extract videos from JSON timeline files using Remotion.

## Installation

```bash
npm install -g videoextract
```

## Usage

```bash
videoextract extract timeline.json
```

### Options
- `-o, --output <path>` - Output directory (defaults to Downloads)
- `-n, --name <name>` - Video filename (defaults to "video")

### Examples

```bash
# Basic usage
videoextract extract timeline.json

# Custom output
videoextract extract timeline.json -o ./videos -n my-video
```

## JSON Format

```json
{
  "durationInFrames": 150,
  "overlays": [
    {
      "type": "text",
      "content": "Hello World!",
      "from": 0,
      "durationInFrames": 150,
      "styles": { "fontSize": 48, "color": "#fff" }
    }
  ]
}
```

## Requirements
- Node.js 16+

## License
ISC
