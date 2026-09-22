// Grupos temáticos del banco de desafíos. El valor (slug) es lo que se
// guarda en `challenges.topic`; el label es lo que se muestra en la UI.
export const CHALLENGE_TOPICS = [
  { value: 'deportes', label: 'Deportes' },
  { value: 'politica', label: 'Política' },
  { value: 'sociedad', label: 'Sociedad' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'comida', label: 'Comida' },
  { value: 'viajes', label: 'Viajes' },
  { value: 'cultura', label: 'Cultura general' },
];

export const topicLabel = (value) =>
  CHALLENGE_TOPICS.find((t) => t.value === value)?.label || value;

export const DIFFICULTIES = [
  { value: 'facil', label: 'Fácil' },
  { value: 'normal', label: 'Normal' },
  { value: 'dificil', label: 'Difícil' },
];

export const AGE_GROUPS = [
  { value: 'junior', label: 'Junior (12+)' },
  { value: 'adult', label: 'Adultos (18+)' },
];
