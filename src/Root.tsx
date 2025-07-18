import React from "react";
import { Composition, registerRoot } from "remotion";
import { MyComp } from "./composition";

const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComp}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={0}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.timeline?.durationInFrames || 0,
            props,
          };
        }}
        defaultProps={{
          overlays: [],
          timeline: null,
          durationInFrames: 0,
          fps: 30,
          width: 1280,
          height: 720,
          setSelectedOverlayId: () => {},
          selectedOverlayId: null,
          changeOverlay: () => {},
        }}
      />
    </>
  );
};

registerRoot(Root);
