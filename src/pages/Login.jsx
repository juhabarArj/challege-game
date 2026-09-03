import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setFormError('Por favor completa todos los campos');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setFormError(error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-primary mb-2">
            Challenge
          </h1>
          <h2 className="text-xl text-neo-dark font-semibold">
            Desafíate con amigos
          </h2>
        </div>

        {/* Form Card */}
        <div className="neo-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold text-neo-dark mb-6">
              Iniciar Sesión
            </h3>

            {formError && (
              <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-4 rounded">
                <p className="text-neo-accent font-semibold">{formError}</p>
              </div>
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Entrar
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center border-t border-neo-light pt-6">
            <p className="text-neo-dark text-sm">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-neo-primary font-semibold hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-neo-dark text-sm opacity-75">
          <p>Juego para 2-6 jugadores</p>
          <p>Categorías: Junior (12+) • Adultos (18+)</p>
        </div>
      </div>
    </div>
  );
}
