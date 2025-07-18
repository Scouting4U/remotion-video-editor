// src/composition.tsx
import React, { useCallback } from "react";
import { AbsoluteFill, getInputProps } from "remotion";
import { Layer } from "./core/Layer";
import { Overlay } from "./core/types";
import { SortedOutlines } from "./selection/sorted-outlines";

export type MyCompProps = {
  /** Array of overlay objects to be rendered */
  readonly overlays: Overlay[];
  /** Function to set the currently selected overlay ID */
  readonly setSelectedOverlayId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  /** Currently selected overlay ID, or null if none selected */
  readonly selectedOverlayId: number | null;
  /**
   * Function to update an overlay
   * @param overlayId - The ID of the overlay to update
   * @param updater - Function that receives the current overlay and returns an updated version
   */
  readonly changeOverlay: (
    overlayId: number,
    updater: (overlay: Overlay) => Overlay
  ) => void;
  /** Duration in frames of the composition */
  readonly durationInFrames: number;
  /** Frames per second of the composition */
  readonly fps: number;
  /** Width of the composition */
  readonly width: number;
  /** Height of the composition */
  readonly height: number;
  /** Base URL for media assets (optional) */
  readonly baseUrl?: string;

  timeline: any;
};

const layerContainer: React.CSSProperties = {
  overflow: "hidden",
  maxWidth: "3000px",
};

const outer: React.CSSProperties = {
  backgroundColor: "#111827",
};

export const MyComp: React.FC<MyCompProps> = ({
  setSelectedOverlayId,
  selectedOverlayId,
  changeOverlay,
  durationInFrames,
  fps,
  width,
  height,
  baseUrl,
  timeline,
}) => {
  // Get input props which should contain the timeline data
  const inputProps = getInputProps();
  const actualTimeline = inputProps?.timeline || timeline;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) {
        return;
      }

      setSelectedOverlayId(null);
    },
    [setSelectedOverlayId]
  );

  const overlays = actualTimeline?.overlays || [];

  return (
    <AbsoluteFill
      style={{
        ...outer,
      }}
      onPointerDown={onPointerDown}
    >
      <AbsoluteFill style={layerContainer}>
        {overlays.map((overlay: Overlay) => {
          return (
            <Layer
              key={overlay.id}
              overlay={overlay}
              selectedOverlayId={selectedOverlayId}
              baseUrl={baseUrl}
            />
          );
        })}
      </AbsoluteFill>
      <SortedOutlines
        selectedOverlayId={selectedOverlayId}
        overlays={overlays}
        setSelectedOverlayId={setSelectedOverlayId}
        changeOverlay={changeOverlay}
      />
    </AbsoluteFill>
  );
};
