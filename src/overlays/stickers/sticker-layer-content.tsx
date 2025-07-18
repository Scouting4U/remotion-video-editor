import React, { memo } from "react";
import { AbsoluteFill } from "remotion";

export interface StickerOverlay {
  id: number;
  type: "sticker";
  content: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  styles?: {
    opacity?: number;
    [key: string]: any;
  };
  props?: Record<string, any>;
}

const DiscountStickerComponent: React.FC<StickerTemplateProps> = ({
  overlay,
  isSelected,
}) => {
  const props = overlay.props || {};
  const {
    percentage = 50,
    backgroundColor = "#3B82F6",
    textColor = "#FFFFFF",
    ribbonColor = "#1E40AF",
  } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: isSelected ? "2px solid white" : "none",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          color: textColor,
          fontSize: `${overlay.width * 0.3}px`,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {percentage}%
        <div
          style={{
            fontSize: `${overlay.width * 0.15}px`,
            fontWeight: "normal",
          }}
        >
          OFF
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -10,
          right: -10,
          backgroundColor: ribbonColor,
          padding: "4px 8px",
          borderRadius: "4px",
          transform: "rotate(-15deg)",
          color: textColor,
          fontSize: `${overlay.width * 0.12}px`,
        }}
      >
        SAVE
      </div>
    </div>
  );
};

export const discountSticker: StickerTemplate = {
  config: {
    id: "discount-circle",
    name: "Discount Circle",
    category: "Default",
    defaultProps: {
      percentage: 50,
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
      ribbonColor: "#1E40AF",
    },
    isPro: true,
  },
  Component: DiscountStickerComponent,
};

export interface StickerTemplateProps {
  overlay: StickerOverlay;
  isSelected: boolean;
  onUpdate?: (updates: Partial<StickerOverlay>) => void;
}

export interface StickerTemplateConfig {
  id: string;
  name: string;
  category: string;
  thumbnail?: string;
  defaultProps?: Record<string, any>;
  isPro?: boolean;
  layout?: "single" | "double";
}

export interface StickerTemplate {
  config: StickerTemplateConfig;
  Component: React.ComponentType<StickerTemplateProps>;
}

interface StickerLayerContentProps {
  overlay: StickerOverlay;
  isSelected: boolean;
  onUpdate?: (updates: Partial<StickerOverlay>) => void;
}

// For now, we'll just use the discount sticker template
const templates: StickerTemplate[] = [
  discountSticker,
  // Add other sticker templates here as they are implemented
];

// Create a lookup map for quick access
export const templateMap = templates.reduce((acc, template) => {
  acc[template.config.id] = template;
  return acc;
}, {} as Record<string, StickerTemplate>);

export const StickerLayerContent: React.FC<StickerLayerContentProps> = memo(
  ({ overlay, isSelected, onUpdate }) => {
    const template = templateMap[overlay.content];

    if (!template) {
      console.warn(`No sticker template found for id: ${overlay.content}`);
      return null;
    }

    const { Component } = template;
    const MemoizedComponent = memo(Component);
    const props = {
      ...template.config.defaultProps,
      overlay,
      isSelected,
      onUpdate,
    };

    return <MemoizedComponent {...props} />;
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.overlay.content === nextProps.overlay.content &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.overlay.styles?.opacity === nextProps.overlay.styles?.opacity &&
      prevProps.overlay.rotation === nextProps.overlay.rotation &&
      prevProps.overlay.width === nextProps.overlay.width &&
      prevProps.overlay.height === nextProps.overlay.height
    );
  }
);

StickerLayerContent.displayName = "StickerLayerContent";
