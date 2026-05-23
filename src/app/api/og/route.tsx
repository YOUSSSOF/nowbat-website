import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "نوبت";
  const description =
    searchParams.get("description") ??
    "سیستم نوبت‌دهی آنلاین برای کسب‌وکارهای ایرانی";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070E",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          direction: "rtl",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translate(50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Border accent top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "#378ADD",
          }}
        />

        {/* Logo / wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#8888AA",
              letterSpacing: "0.1em",
            }}
          >
            nowbat.ir
          </span>
          <span
            style={{
              width: "1px",
              height: "20px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#378ADD",
            }}
          >
            نوبت
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? "42px" : "52px",
            fontWeight: 700,
            color: "#F0F0F8",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
            textAlign: "right",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#8888AA",
            lineHeight: 1.6,
            maxWidth: "800px",
            textAlign: "right",
          }}
        >
          {description}
        </div>

        {/* Bottom pill badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "12px",
            marginTop: "48px",
          }}
        >
          {["وردپرس", "زرین‌پال", "تقویم جلالی", "پیامک"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(55,138,221,0.3)",
                background: "rgba(55,138,221,0.08)",
                color: "#378ADD",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
