import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameStore } from '../store/gameStore';
import { createGameRoom, joinGameRoom } from '../services/supabase';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

export default function Home() {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();
  const { setRoomCode, setCategory } = useGameStore();

  const [mode, setMode] = useState(null); // null | 'create' | 'join'
  const [category, setLocalCategory] = useState('junior');
  const [roomCode, setLocalRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      setError('');
      
      const room = await createGameRoom(userProfile?.id, category);
      setRoomCode(room.room_code);
      setCategory(category);
      
      navigate(`/lobby/${room.room_code}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    try {
      setLoading(true);
      setError('');

      if (!roomCode || roomCode.length !== 6) {
        setError('Código de sala inválido (debe ser 6 caracteres)');
        return;
      }

      await joinGameRoom(roomCode.toUpperCase(), userProfile?.id);
      setRoomCode(roomCode.toUpperCase());
      
      navigate(`/lobby/${roomCode.toUpperCase()}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Error al cerrar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neo-primary">Challenge Game</h1>
            <p className="text-neo-dark text-sm mt-1">
              Bienvenido, <span className="font-semibold">{userProfile?.username}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-neo-dark opacity-75 hover:opacity-100 transition-opacity"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <div className="neo-card">
            <h2 className="text-2xl font-bold text-neo-dark mb-4">Crear Sala</h2>
            <p className="text-neo-dark opacity-75 mb-6">
              Sé el anfitrión y espera a tus amigos
            </p>

            {!mode || mode === 'create' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-neo-dark font-semibold mb-2">
                    Categoría
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="junior"
                        checked={category === 'junior'}
                        onChange={(e) => setLocalCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-neo-dark">Junior (12+)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="adult"
                        checked={category === 'adult'}
                        onChange={(e) => setLocalCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-neo-dark">Adultos (18+)</span>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-3 rounded text-sm">
                    <p className="text-neo-accent">{error}</p>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onClick={handleCreateRoom}
                  className="w-full"
                >
                  Crear Sala
                </Button>
              </div>
            ) : null}
          </div>

          {/* Join Room Card */}
          <div className="neo-card">
            <h2 className="text-2xl font-bold text-neo-dark mb-4">Unirse a Sala</h2>
            <p className="text-neo-dark opacity-75 mb-6">
              Introduce el código que te compartieron
            </p>

            {!mode || mode === 'join' ? (
              <div className="space-y-4">
                <Input
                  placeholder="Ej: AB12CD"
                  value={roomCode}
                  onChange={(e) => setLocalRoomCode(e.target.value.toUpperCase())}
                  maxLength="6"
                />

                {error && (
                  <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-3 rounded text-sm">
                    <p className="text-neo-accent">{error}</p>
                  </div>
                )}

                <Button
                  variant="secondary"
                  size="lg"
                  loading={loading}
                  onClick={handleJoinRoom}
                  className="w-full"
                >
                  Unirse
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 neo-card bg-opacity-50">
          <h3 className="text-lg font-bold text-neo-dark mb-3">ℹ️ Cómo jugar</h3>
          <ul className="text-neo-dark text-sm space-y-2 opacity-75">
            <li>✓ 2 a 6 jugadores en línea</li>
            <li>✓ Turnos: cada jugador completa un desafío</li>
            <li>✓ Fotografía: toma una foto del desafío completado</li>
            <li>✓ Validación: el sistema verifica si es correcto</li>
            <li>✓ Puntos: gana puntos y sube en el ranking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
