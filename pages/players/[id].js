import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PlayerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/players?id=${id}`)
      .then(r => r.json())
      .then(data => setPlayer(data));
  }, [id]);

  if (!player) return <div>Loading...</div>;
  return (
    <div>
      <h2>{player.firstName} {player.lastName}</h2>
      <div>Email: {player.email}</div>
      {/* Add weekly round, score details, average, etc. here */}
    </div>
  );
}