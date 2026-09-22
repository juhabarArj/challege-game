import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../services/supabase';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Loading from '../components/Common/Loading';
import ThemeToggle from '../components/Common/ThemeToggle';
import { CHALLENGE_TOPICS, DIFFICULTIES, AGE_GROUPS, topicLabel } from '../constants/challengeTopics';

const emptyForm = {
  id: null,
  description: '',
  topic: CHALLENGE_TOPICS[0].value,
  category: 'junior',
  difficulty: 'normal',
  requiresPhoto: true,
};

export default function Admin() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [topicFilter, setTopicFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const loadChallenges = async () => {
    setLoading(true);
    try {
      const data = await getAllChallenges();
      setChallenges(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los desafíos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const resetForm = () => setForm(emptyForm);

  const handleEdit = (challenge) => {
    setForm({
      id: challenge.id,
      description: challenge.description,
      topic: challenge.topic || CHALLENGE_TOPICS[0].value,
      category: challenge.category,
      difficulty: challenge.difficulty,
      requiresPhoto: challenge.requires_photo,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este desafío?')) return;
    try {
      await deleteChallenge(id);
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar el desafío');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.description.trim()) {
      setError('La descripción no puede estar vacía');
      return;
    }

    try {
      setSaving(true);
      if (form.id) {
        const updated = await updateChallenge(form.id, form);
        setChallenges((prev) => prev.map((c) => (c.id === form.id ? updated : c)));
      } else {
        const created = await createChallenge(form);
        setChallenges((prev) => [created, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.message || 'Error al guardar el desafío');
    } finally {
      setSaving(false);
    }
  };

  const filtered = challenges.filter((c) => {
    if (topicFilter !== 'all' && c.topic !== topicFilter) return false;
    if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
    return true;
  });

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-neo-bg p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-neo-primary font-semibold hover:underline text-sm">
              ← Volver
            </Link>
            <h1 className="text-3xl font-bold text-neo-primary mt-1">Panel de administración</h1>
            <p className="text-neo-dark opacity-75 text-sm">Gestiona el banco de desafíos</p>
          </div>
          <ThemeToggle />
        </div>

        {error && (
          <div className="bg-neo-accent bg-opacity-10 border-l-4 border-neo-accent p-4 rounded mb-6">
            <p className="text-neo-accent font-semibold">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="neo-card mb-6">
          <h2 className="text-xl font-bold text-neo-dark mb-4">
            {form.id ? 'Editar desafío' : 'Añadir desafío'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-neo-dark font-semibold mb-2 text-sm">Descripción</label>
              <textarea
                className="neo-input min-h-[80px] resize-y"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Ej: Haz una foto imitando a tu animal favorito"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-neo-dark font-semibold mb-2 text-sm">Grupo</label>
                <select
                  className="neo-input"
                  value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                >
                  {CHALLENGE_TOPICS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neo-dark font-semibold mb-2 text-sm">Categoría</label>
                <select
                  className="neo-input"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  {AGE_GROUPS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neo-dark font-semibold mb-2 text-sm">Dificultad</label>
                <select
                  className="neo-input"
                  value={form.difficulty}
                  onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={form.requiresPhoto}
                onChange={(e) => setForm((f) => ({ ...f, requiresPhoto: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-neo-dark">📷 Requiere foto</span>
            </label>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" loading={saving}>
                {form.id ? 'Guardar cambios' : 'Añadir desafío'}
              </Button>
              {form.id && (
                <Button type="button" variant="default" onClick={resetForm}>
                  Cancelar edición
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            className="neo-input w-auto"
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            <option value="all">Todos los grupos</option>
            {CHALLENGE_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <select
            className="neo-input w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {AGE_GROUPS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>

          <span className="text-neo-dark opacity-75 self-center text-sm">
            {filtered.length} desafío{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="neo-card flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="text-neo-dark">{c.description}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <span className="px-2 py-1 rounded-neo bg-neo-bg text-neo-primary font-semibold">
                    {topicLabel(c.topic)}
                  </span>
                  <span className="px-2 py-1 rounded-neo bg-neo-bg text-neo-dark">
                    {c.category === 'junior' ? 'Junior' : 'Adultos'}
                  </span>
                  <span className="px-2 py-1 rounded-neo bg-neo-bg text-neo-dark">
                    {c.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-neo bg-neo-bg text-neo-dark">
                    {c.requires_photo ? '📷 Con foto' : '💬 Sin foto'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(c)}>
                  Editar
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(c.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="neo-card text-center text-neo-dark opacity-75">
              No hay desafíos con estos filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
