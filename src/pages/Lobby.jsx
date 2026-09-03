import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getGameRoom, subscribeToRoomChanges } from '../services/supabase';
import { useGameStore } from '../store/gameStore';
import Button from '../components/Common/Button';
import Loading from '../components/Common/Loading';

export default function Lobby() {
  const { roomCode: paramRoomCode } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { setPlayers, setGameStatus } = useGameStore();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isCreator = room?.created_by === userProfile?.id;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getGameRoom(paramRoomCode);
        if (!roomData) {
          setError('Sala no encontrada');
          return;
        }
        setRoom(roomData);
        setPlayers(roomData.players || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

    // Subscribe to real-time updates
    const subscription = subscribeToRoomChanges(paramRoomCode, (updatedRoom) => {
      setRoom(updatedRoom);
      setPlayers(updatedRoom.players || []);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [paramRoomCode, setPlayers]);

  const handleStartGame = async () => {
    if (room.players.length < 2) {
      setError('Se necesitan al menos 2 jugadores');
      return;
    }

    try {
      setGameStatus('playing');
      navigate(`/game/${paramRoomCode}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeave = () => {
    navigate('/');
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neo-primary mb-2">
            Sala: {paramRoomCode}
          </h1>
          <p className="text-neo-dark">
            Categoría: <span className="font-semibold capitalize">{room?.category}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-4 rounded mb-6">
            <p className="text-neo-accent font-semibold">{error}</p>
          </div>
        )}

        {/* Players List */}
        <div className="neo-card mb-6">
          <h2 className="text-2xl font-bold text-neo-dark mb-4">
            Jugadores ({room?.players?.length || 0}/{room?.max_players || 6})
          </h2>
          <div className="space-y-2">
            {room?.players?.map((player, index) => (
              <div key={player.id} className="flex items-center p-3 bg-neo-light rounded-neo shadow-neo-button">
                <span className="text-neo-primary font-bold mr-3 text-lg">{index + 1}</span>
                <span className="text-neo-dark font-semibold">
                  {player.username || `Jugador ${index + 1}`}
                  {player.id === userProfile?.id && ' (Tú)'}
                  {player.id === room?.created_by && ' 👑'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {isCreator && room?.players?.length >= 2 && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartGame}
              className="flex-1"
            >
              Iniciar Juego
            </Button>
          )}
          <Button
            variant="secondary"
            size="lg"
            onClick={handleLeave}
            className="flex-1"
          >
            Salir
          </Button>
        </div>

        {/* Info */}
        <div className="mt-8 neo-card bg-opacity-50">
          <p className="text-neo-dark text-sm opacity-75">
            {isCreator
              ? '👑 Eres el anfitrión. Espera a que se unan 2-6 jugadores y haz clic en "Iniciar Juego"'
              : '⏳ Esperando al anfitrión para iniciar el juego...'}
          </p>
        </div>
      </div>
    </div>
  );
}
