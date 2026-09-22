import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { updateUserProfile } from '../services/supabase';
import { changeUserPassword } from '../services/firebase';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import ThemeToggle from '../components/Common/ThemeToggle';
import { AGE_GROUPS } from '../constants/challengeTopics';

export default function Profile() {
  const { userProfile } = useAuth();
  const setUserProfile = useAuthStore((s) => s.setUserProfile);

  const [profileForm, setProfileForm] = useState({
    username: userProfile?.username || '',
    ageGroup: userProfile?.age_group || 'junior',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');

    if (profileForm.username.trim().length < 3) {
      setProfileError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    try {
      setProfileSaving(true);
      const updated = await updateUserProfile(userProfile.id, profileForm);
      setUserProfile(updated);
      setProfileMessage('Perfil actualizado correctamente');
    } catch (err) {
      setProfileError(err.message || 'Error al actualizar el perfil');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    try {
      setPasswordSaving(true);
      await changeUserPassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordMessage('Contraseña actualizada correctamente');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const message = err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? 'La contraseña actual no es correcta'
        : err.message || 'Error al cambiar la contraseña';
      setPasswordError(message);
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-neo-primary font-semibold hover:underline text-sm">
              ← Volver
            </Link>
            <h1 className="text-3xl font-bold text-neo-primary mt-1">Mi perfil</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Edit profile */}
        <div className="neo-card mb-6">
          <h2 className="text-xl font-bold text-neo-dark mb-4">Datos del perfil</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Nombre de usuario"
              name="username"
              value={profileForm.username}
              onChange={(e) => setProfileForm((p) => ({ ...p, username: e.target.value }))}
            />

            <div>
              <label className="block text-neo-dark font-semibold mb-2 text-sm">Categoría</label>
              <div className="flex gap-4">
                {AGE_GROUPS.map((g) => (
                  <label key={g.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="ageGroup"
                      value={g.value}
                      checked={profileForm.ageGroup === g.value}
                      onChange={(e) => setProfileForm((p) => ({ ...p, ageGroup: e.target.value }))}
                      className="mr-2"
                    />
                    <span className="text-neo-dark">{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {profileError && (
              <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-3 rounded text-sm">
                <p className="text-neo-accent">{profileError}</p>
              </div>
            )}
            {profileMessage && (
              <div className="bg-neo-success bg-opacity-10 border-l-4 border-neo-success p-3 rounded text-sm">
                <p className="text-neo-success">{profileMessage}</p>
              </div>
            )}

            <Button type="submit" variant="primary" loading={profileSaving}>
              Guardar cambios
            </Button>
          </form>
        </div>

        {/* Change password */}
        <div className="neo-card">
          <h2 className="text-xl font-bold text-neo-dark mb-4">Cambiar contraseña</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Contraseña actual"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
            />
            <Input
              label="Nueva contraseña"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
            />
            <Input
              label="Confirmar nueva contraseña"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
            />

            {passwordError && (
              <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-3 rounded text-sm">
                <p className="text-neo-accent">{passwordError}</p>
              </div>
            )}
            {passwordMessage && (
              <div className="bg-neo-success bg-opacity-10 border-l-4 border-neo-success p-3 rounded text-sm">
                <p className="text-neo-success">{passwordMessage}</p>
              </div>
            )}

            <Button type="submit" variant="secondary" loading={passwordSaving}>
              Actualizar contraseña
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
