import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameStore } from '../store/gameStore';
import { getChallenges, getGameRoom } from '../services/supabase';
import Button from '../components/Common/Button';
import Loading from '../components/Common/Loading';

export default function GameBoard() {
  const { roomCode: paramRoomCode } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { players, category } = useGameStore();

  const [room, setRoom] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        const roomData = await getGameRoom(paramRoomCode);
        setRoom(roomData);

        const challengesList = await getChallenges(category || 'junior', 50);
        setChallenges(challengesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [paramRoomCode, category]);

  if (loading) return <Loading />;

  const currentPlayer = players[currentPlayerIndex];
  const currentChallenge = challenges[currentRound - 1];
  const isCurrentPlayerMe = currentPlayer?.id === userProfile?.id;

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-neo-primary">
              Ronda {currentRound}
            </h1>
            <span className="text-neo-dark font-semibold">
              Jugador {currentPlayerIndex + 1}/{players.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-neo-light rounded-full overflow-hidden shadow-neo-inset">
            <div
              className="h-full bg-neo-primary transition-all duration-300"
              style={{ width: `${((currentRound - 1) / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-4 rounded mb-6">
            <p className="text-neo-accent font-semibold">{error}</p>
          </div>
        )}

        {/* Current Player Info */}
        <div className="neo-card mb-6">
          <h2 className="text-xl text-neo-dark mb-2">
            Turno de: <span className="font-bold text-neo-primary">{currentPlayer?.username || 'Cargando...'}</span>
          </h2>
          {isCurrentPlayerMe && (
            <p className="text-neo-success font-semibold">✓ Es tu turno</p>
          )}
        </div>

        {/* Challenge Card */}
        {currentChallenge && (
          <div className="neo-card mb-6">
            <h3 className="text-2xl font-bold text-neo-dark mb-2">Desafío</h3>
            <div className="bg-neo-light p-4 rounded-neo mb-4">
              <p className="text-neo-dark text-lg">{currentChallenge.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neo-dark">Dificultad:</span>
              <div className="flex gap-1">
                {Array.from({ length: currentChallenge.difficulty }).map((_, i) => (
                  <span key={i} className="text-neo-primary text-xl">⭐</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {isCurrentPlayerMe ? (
          <div className="flex gap-4">
            <Button variant="primary" size="lg" className="flex-1">
              📷 Tomar Foto
            </Button>
            <Button variant="secondary" size="lg" className="flex-1">
              ⏭️ Saltar
            </Button>
          </div>
        ) : (
          <div className="neo-card text-center">
            <p className="text-neo-dark opacity-75">
              Esperando a que {currentPlayer?.username} complete el desafío...
            </p>
          </div>
        )}

        {/* Players Scores */}
        <div className="mt-8 neo-card">
          <h3 className="text-lg font-bold text-neo-dark mb-4">Puntuaciones</h3>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div key={player.id} className="flex justify-between items-center p-2">
                <span className={`font-semibold ${index === currentPlayerIndex ? 'text-neo-primary' : 'text-neo-dark'}`}>
                  {player.username}
                </span>
                <span className="text-neo-primary font-bold">0 pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
