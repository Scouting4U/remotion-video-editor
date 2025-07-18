# 🎬 Remotion Video Renderer

A powerful video composition and rendering system built with [Remotion](https://www.remotion.dev/) that transforms timeline data into high-quality videos with support for multiple overlay types.

## ✨ Features

- 🎥 **Video Overlays**: Support for external video clips with timing control
- 🖼️ **Image Overlays**: Static images with positioning and styling
- 📝 **Text Overlays**: Rich text with custom fonts, colors, and effects
- 🎵 **Audio Support**: Background music and sound effects
- 🎨 **Visual Effects**: Animations, transitions, and styling
- ⚡ **High Performance**: Optimized rendering with Remotion's engine

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Usage

1. **Prepare your timeline data** in `timeline.sample.json`
2. **Render your video**:
   ```bash
   npm run render
   ```
3. **Find your output** in the `out/` directory

## 📁 Project Structure

```
src/
├── composition.tsx      # Main video composition component
├── index.tsx           # Render entry point
├── Root.tsx            # Remotion root configuration
├── loadTimeline.ts     # Timeline data loader
└── core/
    ├── Layer.tsx       # Individual layer renderer
    ├── layer-content.tsx # Layer content switcher
    └── types.ts        # TypeScript type definitions
```

## 🎛️ Timeline Configuration

The timeline JSON structure supports various overlay types:

### Text Overlays

```json
{
  "type": "text",
  "content": "Your Text Here",
  "styles": {
    "fontSize": "3rem",
    "color": "#FFFFFF",
    "textShadow": "2px 2px 0px #000000"
  }
}
```

### Video Overlays

```json
{
  "type": "clip",
  "src": "https://example.com/video.mp4",
  "videoStartTime": 0
}
```

### Image Overlays

```json
{
  "type": "image",
  "src": "https://example.com/image.jpg"
}
```

## ⚙️ Configuration

- **Output Format**: H.264 MP4
- **Resolution**: 1280x720 (configurable)
- **Frame Rate**: 30 FPS (configurable)
- **Duration**: Based on timeline data

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development (if applicable)
npm run dev

# Build and render
npm run render

# Type checking
npm run type-check
```

## 📦 Built With

- [Remotion](https://www.remotion.dev/) - Video rendering framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ using Remotion**
