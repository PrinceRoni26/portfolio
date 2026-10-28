import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — I develop. I optimize. I create.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F4F0",
          color: "#111111",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(17,17,17,.28)", paddingBottom: 18, fontSize: 22, fontFamily: "monospace", letterSpacing: 2 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            PRM
            <span style={{ width: 10, height: 10, borderRadius: 10, background: "#4F6BFF" }} />
          </span>
          <span style={{ color: "#6c6c6a" }}>CAGAYAN DE ORO, PH</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 700, lineHeight: 0.88, letterSpacing: -6 }}>
          <span>I DEVELOP.</span>
          <span>I OPTIMIZE.</span>
          <span style={{ color: "#4F6BFF" }}>I CREATE.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <span>{site.name}</span>
          <span style={{ color: "#6c6c6a" }}>Software developer &amp; creative technologist</span>
        </div>
      </div>
    ),
    size,
  );
}
