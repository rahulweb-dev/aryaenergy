"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ maxWidth: 420, textAlign: "center" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>This page didn&apos;t load</h1>
            <p style={{ marginTop: 8, fontSize: "0.875rem", color: "#6b7280" }}>
              Something went wrong on our end. Please refresh or head back home.
            </p>
            <button
              onClick={() => reset()}
              style={{ marginTop: 24, padding: "0.5rem 1rem", borderRadius: 6, background: "#2563eb", color: "#fff", fontSize: "0.875rem", border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
