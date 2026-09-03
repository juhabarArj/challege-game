import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    ageGroup: 'junior'
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

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username) {
      setFormError('Por favor completa todos los campos');
      return false;
    }

    if (formData.password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return false;
    }

    if (formData.username.length < 3) {
      setFormError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register(
        formData.email,
        formData.password,
        formData.username,
        formData.ageGroup
      );
      navigate('/');
    } catch (err) {
      setFormError(error || 'Error al registrarse');
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
              Crear Cuenta
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
              label="Nombre de usuario"
              type="text"
              name="username"
              placeholder="Mi nombre genial"
              value={formData.username}
              onChange={handleChange}
            />

            <div>
              <label className="block text-neo-dark font-semibold mb-2 text-sm">
                Categoría
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="junior"
                    checked={formData.ageGroup === 'junior'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-neo-dark">Junior (12+)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="adult"
                    checked={formData.ageGroup === 'adult'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-neo-dark">Adulto (18+)</span>
                </label>
              </div>
            </div>

            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center border-t border-neo-light pt-6">
            <p className="text-neo-dark text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-neo-primary font-semibold hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
