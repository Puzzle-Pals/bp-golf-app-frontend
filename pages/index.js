import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5E8C7",
      color: "#3C2F2F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "4rem",
      fontFamily: "inherit"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 24px rgba(60,47,47,0.08)",
        padding: "2.5rem 2rem",
        maxWidth: "500px",
        width: "100%",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#3C2F2F",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          letterSpacing: "1px"
        }}>
          Welcome to the BP Golf League!
        </h1>
        <p style={{
          fontSize: "1.15rem",
          marginBottom: "1.5rem",
          color: "#3C2F2F"
        }}>
          Track player stats, check the leaderboard, and view weekly results. Use the navigation above to explore.
        </p>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem"
        }}>
          <Link href="/player-stats" style={{
            textDecoration: "none"
          }}>
            <div style={{
              background: "#C71585",
              color: "#F5E8C7",
              borderRadius: "0.25rem",
              padding: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              transition: "background 0.2s, color 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Player Stats
            </div>
          </Link>
          <Link href="/leaderboard" style={{
            textDecoration: "none"
          }}>
            <div style={{
              background: "#C71585",
              color: "#F5E8C7",
              borderRadius: "0.25rem",
              padding: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              transition: "background 0.2s, color 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Leaderboard
            </div>
          </Link>
          <Link href="/weekly-results" style={{
            textDecoration: "none"
          }}>
            <div style={{
              background: "#C71585",
              color: "#F5E8C7",
              borderRadius: "0.25rem",
              padding: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              transition: "background 0.2s, color 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Weekly Results
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}