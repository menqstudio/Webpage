import { ImageResponse } from "next/og";

export const alt = "MenQ — AI automation and software solutions for business growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand social card. Latin-only text so it renders with the built-in font
// (no Armenian font fetch needed); used for HY/EN/RU shares alike.
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
          padding: "80px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #0b2540 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              fontWeight: 800,
              color: "#020617",
            }}
          >
            M
          </div>
          <div style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            MenQ
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            <div style={{ display: "flex" }}>AI automation & software solutions</div>
            <div style={{ display: "flex", color: "#22d3ee" }}>for business growth</div>
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#94a3b8" }}>
            CRM · ERP · Dashboards · Web · Workflow automation · AI
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Reduce costs", "Save time", "Win customers", "Stay in control"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  fontSize: "24px",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "999px",
                  padding: "10px 22px",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
