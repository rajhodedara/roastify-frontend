import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";

/* ================= ROAST PARSER ================= */

function parseRoast(text) {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const headline =
    lines.find(l => l.startsWith("**"))?.replace(/\*\*/g, "") || "";

  const bullets = lines.filter(
    l => l.startsWith("- ") || l.startsWith("* ")
  );

  const verdict =
    lines.find(l =>
      l.toLowerCase().startsWith("final verdict")
    ) || "";

  return {
    headline,
    bullets,
    verdict,
  };
}

/* ================= STAT BLOCK ================= */

function StatBlock({ title, items, showImage }) {
  return (
    <div className="stat-block">
      <h3>{title}</h3>
      <ul className="stat-list">
        {items.map((item, i) => (
          <li key={i} className="stat-item">
            {showImage && item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="stat-image"
              />
            )}
            <span>{item.name || item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function Result() {
  const [params] = useSearchParams();
  const encodedData = params.get("data");

  let data = null;

  try {
    data = encodedData
      ? JSON.parse(decodeURIComponent(encodedData))
      : null;
  } catch {
    data = null;
  }

  /* ================= DOWNLOAD ROAST IMAGE ================= */

  const downloadRoastImage = async () => {
    const element = document.getElementById("roast-card");
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: "#0f0f0f",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "my-spotify-roast.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* ================= ERROR STATE ================= */

  if (!data) {
    return (
      <div className="container result-page">
        <h1>Something went wrong 😕</h1>
        <p>Please try logging in again.</p>
      </div>
    );
  }

  const parsedRoast = parseRoast(data.roast);

  return (
    <div className="container result-page">
      <h1>Your Spotify Roast 🔥</h1>

      {/* ================= ROAST CARD ================= */}
      <div className="roast-card-wrapper">
        <div className="roast-card" id="roast-card">
          {parsedRoast?.headline && (
            <h2 className="roast-headline">
              {parsedRoast.headline}
            </h2>
          )}

          {parsedRoast?.bullets?.length > 0 && (
            <ul className="roast-bullets">
              {parsedRoast.bullets.map((line, i) => (
                <li key={i}>
                  {line.replace(/^(\*|-)\s*/, "")}
                </li>
              ))}
            </ul>
          )}

          {parsedRoast?.verdict && (
            <p className="roast-verdict">
              {parsedRoast.verdict}
            </p>
          )}

          <div className="roast-footer">
            <span>🔥 Roastify</span>
            <span>roastify.app</span>
          </div>
        </div>
      </div>

      <button
        className="download-btn"
        onClick={downloadRoastImage}
      >
        Download Roast 🔥
      </button>

      {/* ================= STATS ================= */}
      <div className="divider" />
      <h2 className="section-title">Your Music DNA 🧬</h2>

      <div className="stats-section">
        <StatBlock
          title="Top Artists"
          items={data.stats.top_artists}
          showImage
        />
        <StatBlock
          title="Recently Played"
          items={data.stats.recent_tracks}
          showImage
        />
        <StatBlock
          title="Top Genres"
          items={data.stats.genres}
          showImage={false}
        />
      </div>
    </div>
  );
}
