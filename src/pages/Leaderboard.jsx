import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getGameResults } from '../services/supabase';
import { useGameStore } from '../store/gameStore';
import Button from '../components/Common/Button';
import Loading from '../components/Common/Loading';

export default function Leaderboard() {
  const { roomCode: paramRoomCode } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { resetGame } = useGameStore();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const gameResults = await getGameResults(paramRoomCode);
        setResults(gameResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [paramRoomCode]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  const handleGoHome = () => {
    resetGame();
    navigate('/');
  };

  if (loading) return <Loading />;

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-primary mb-2">
            ¡Fin del Juego!
          </h1>
          <p className="text-neo-dark">Resultados de la partida</p>
        </div>

        {error && (
          <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-4 rounded mb-6">
            <p className="text-neo-accent font-semibold">{error}</p>
          </div>
        )}

        {/* Leaderboard */}
        <div className="neo-card mb-6">
          <h2 className="text-2xl font-bold text-neo-dark mb-6">Ranking</h2>
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={result.player_id}
                  className="flex items-center gap-4 p-4 bg-neo-light rounded-neo shadow-neo-button hover:shadow-neo-lg transition-shadow"
                >
                  <span className="text-3xl min-w-[50px]">
                    {medals[index] || `${index + 1}º`}
                  </span>
                  <div className="flex-1">
                    <p className="text-neo-dark font-bold">
                      {result.player_id === userProfile?.id ? '👤 Tú' : `Jugador ${index + 1}`}
                    </p>
                    <p className="text-neo-dark text-sm opacity-75">
                      Puntos: {result.final_score}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-neo-primary font-bold text-2xl">
                      {result.final_score}
                    </p>
                    <p className="text-neo-dark text-xs opacity-50">pts</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neo-dark text-center opacity-75">
                No hay resultados disponibles
              </p>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="neo-card text-center">
            <p className="text-neo-dark text-sm opacity-75 mb-2">Total Jugadores</p>
            <p className="text-3xl font-bold text-neo-primary">{results.length}</p>
          </div>
          <div className="neo-card text-center">
            <p className="text-neo-dark text-sm opacity-75 mb-2">Ganador</p>
            <p className="text-2xl font-bold text-neo-success">
              {results[0]?.player_id === userProfile?.id ? '¡Tú! 🎉' : '👑'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handlePlayAgain}
            className="flex-1"
          >
            Jugar de Nuevo
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGoHome}
            className="flex-1"
          >
            Ir a Inicio
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-neo-dark text-sm opacity-75">
          <p>Gracias por jugar Challenge Game</p>
          <p className="mt-1">Código de sala: <span className="font-mono font-semibold">{paramRoomCode}</span></p>
        </div>
      </div>
    </div>
  );
}
