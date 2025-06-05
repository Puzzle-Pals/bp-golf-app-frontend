import Link from "next/link";

export default function AdminHome() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link href="/admin/players">Manage Players</Link></li>
        <li><Link href="/admin/add-week">Add Weekly Results</Link></li>
        {/* Add other admin links as needed */}
      </ul>
    </div>
  );
}