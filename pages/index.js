import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to BP Golf App</h1>
      <nav>
        <ul>
          <li><Link href="/leaderboard">Leaderboard</Link></li>
          <li><Link href="/player-stats">Player Stats</Link></li>
          <li><Link href="/weekly-results">Weekly Results</Link></li>
        </ul>
      </nav>
    </div>
  );
}