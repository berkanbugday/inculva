// apps/video/src/Root.tsx
import React from "react";
import { Composition } from "remotion";
import { WelcomeVideo } from "./compositions/WelcomeVideo";

const DURATION = 1740; // 29s × 60fps
const FPS = 60;

export function Root() {
  return (
    <>
      <Composition
        id="WelcomeVideo-EN-Portrait"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ lang: "en" as const, aspectRatio: "portrait" as const }}
      />
      <Composition
        id="WelcomeVideo-TR-Portrait"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ lang: "tr" as const, aspectRatio: "portrait" as const }}
      />
      <Composition
        id="WelcomeVideo-EN-Landscape"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ lang: "en" as const, aspectRatio: "landscape" as const }}
      />
      <Composition
        id="WelcomeVideo-TR-Landscape"
        component={WelcomeVideo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ lang: "tr" as const, aspectRatio: "landscape" as const }}
      />
    </>
  );
}
