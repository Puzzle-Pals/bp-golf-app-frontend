import { useState, useEffect } from 'react';

export default function PrizePayouts() {
  const [payouts, setPayouts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayouts();
    // eslint-disable-next-line
  }, []);

  const fetchPayouts = async () => {
    try {
      setError('');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prize_payouts`);
      if (!res.ok) throw new Error('Failed to fetch payouts');
      const data = await res.json();
      setPayouts(data);
    } catch (err) {
      setError('Failed to fetch prize payouts');
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ color: '#3C2F2F', fontWeight: 'bold', marginBottom: '1rem' }}>Prize Payouts</h3>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      {payouts.total ? (
        <div style={{ background: '#F5E8C7', padding: '1rem', borderRadius: '0.25rem', color: '#3C2F2F' }}>
          <p><strong>Total:</strong> ${payouts.total}</p>
          <p><strong>Winners (30%):</strong> ${payouts.winners?.amount} {payouts.winners?.players && `to Players ${payouts.winners.players.join(', ')}`}</p>
          <p><strong>2nd Place (20%):</strong> ${payouts.secondPlace?.amount} {payouts.secondPlace?.players && `to Players ${payouts.secondPlace.players.join(', ')}`}</p>
          <p><strong>Deuce Pot (20%):</strong> ${payouts.deucePot?.amount} {payouts.deucePot?.players && `to Players ${payouts.deucePot.players.join(', ')}`}</p>
          <p><strong>Closest to Pin (20%):</strong> ${payouts.closestToPin?.amount} {payouts.closestToPin?.players && `to Player ${payouts.closestToPin.players[0]}`}</p>
          <p><strong>Highest Score (10%):</strong> ${payouts.highestScore?.amount} {payouts.highestScore?.players && `to Player ${payouts.highestScore.players[0]}`}</p>
        </div>
      ) : (
        <p>No payout data available.</p>
      )}
    </div>
  );
}