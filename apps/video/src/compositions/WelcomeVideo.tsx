// apps/video/src/compositions/WelcomeVideo.tsx
import React from "react";
import { Sequence, Audio, staticFile, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import type { Lang, AspectRatio } from "../types";
import { StruggleScene } from "./scenes/StruggleScene";
import { PlacesScene } from "./scenes/PlacesScene";
import { RealityScene } from "./scenes/RealityScene";
import { TurnScene } from "./scenes/TurnScene";
import { BrandScene } from "./scenes/BrandScene";

loadFont();

type WelcomeVideoProps = {
  lang: Lang;
  aspectRatio: AspectRatio;
};

export function WelcomeVideo({ lang, aspectRatio }: WelcomeVideoProps) {
  return (
    <div style={{ width: "100%", height: "100%", fontFamily: "Inter, sans-serif", background: "#000000" }}>
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10, 375, 405], [0, 0.7, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={0} durationInFrames={90} style={{ position: "absolute", inset: 0 }}>
        <StruggleScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={90} durationInFrames={75} style={{ position: "absolute", inset: 0 }}>
        <PlacesScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={165} durationInFrames={60} style={{ position: "absolute", inset: 0 }}>
        <RealityScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={225} durationInFrames={105} style={{ position: "absolute", inset: 0 }}>
        <TurnScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={330} durationInFrames={75} style={{ position: "absolute", inset: 0 }}>
        <BrandScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
    </div>
  );
}
