// apps/video/src/compositions/WelcomeVideo.tsx
import React from "react";
import { Sequence, Audio, staticFile, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import type { Lang, AspectRatio } from "../types";
import { OpeningScene } from "./scenes/OpeningScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { WidgetDemoScene } from "./scenes/WidgetDemoScene";
import { CtaScene } from "./scenes/CtaScene";

loadFont();

type WelcomeVideoProps = {
  lang: Lang;
  aspectRatio: AspectRatio;
};

export function WelcomeVideo({ lang, aspectRatio }: WelcomeVideoProps) {
  return (
    <div style={{ width: "100%", height: "100%", fontFamily: "Inter, sans-serif", background: "#0f172a" }}>
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 120, 2400, 2520], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={0} durationInFrames={300} style={{ position: "absolute", inset: 0 }}>
        <OpeningScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={300} durationInFrames={420} style={{ position: "absolute", inset: 0 }}>
        <ProblemScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={720} durationInFrames={360} style={{ position: "absolute", inset: 0 }}>
        <SolutionScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={1080} durationInFrames={960} style={{ position: "absolute", inset: 0 }}>
        <WidgetDemoScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
      <Sequence from={2040} durationInFrames={480} style={{ position: "absolute", inset: 0 }}>
        <CtaScene lang={lang} aspectRatio={aspectRatio} />
      </Sequence>
    </div>
  );
}
