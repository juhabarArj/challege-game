-- Challenge Game PWA — migration 003: multiple-choice answers for
-- no-photo challenges (options + correct_answer), clickable in-game.
-- Run once in the Supabase Dashboard: SQL Editor > New query > paste > Run
-- (after migration_002_admin_topics.sql has already been run).

alter table public.challenges
  add column if not exists options text[],
  add column if not exists correct_answer text;

-- Cosmetic fix: migration_002 wrote one description using double quotes
-- around a phrase ("trabajo en equipo"), which Postgres stored literally
-- instead of the intended single quotes. Restores the intended text.
update public.challenges
set description = 'Haz una foto representando ''trabajo en equipo'' con objetos'
where description = 'Haz una foto representando "trabajo en equipo" con objetos'
  and topic = 'sociedad';

-- Rewrite the no-photo challenges seeded by migration_002 as real
-- multiple-choice trivia (they were open-ended "nombra X" dares, which
-- don't fit a clickable single-correct-answer format). Matched by their
-- original description text, scoped to the same topic as a safety check.

update public.challenges set
  description = '¿Cuál de estos deportes SÍ es olímpico?',
  options = array['Ajedrez', 'Bádminton', 'Póker', 'Billar'],
  correct_answer = 'Bádminton'
where description = 'Nombra 5 deportes olímpicos en 15 segundos' and topic = 'deportes';

update public.challenges set
  description = '¿Qué selección ganó el Mundial de fútbol de 2010?',
  options = array['España', 'Francia', 'Italia', 'Argentina'],
  correct_answer = 'España'
where description = 'Di el nombre de 3 campeones del mundo de fútbol' and topic = 'deportes';

update public.challenges set
  description = '¿Cuál es la capital de Portugal?',
  options = array['Oporto', 'Lisboa', 'Madrid', 'Sevilla'],
  correct_answer = 'Lisboa'
where description = 'Nombra 3 países y su capital en 20 segundos' and topic = 'politica';

update public.challenges set
  description = '¿Cada cuántos años se celebran elecciones generales en España?',
  options = array['2 años', '4 años', '5 años', '7 años'],
  correct_answer = '4 años'
where description = 'Explica en una frase qué es la democracia' and topic = 'politica';

update public.challenges set
  description = '¿A partir de qué edad se puede votar en España?',
  options = array['16 años', '18 años', '21 años', '25 años'],
  correct_answer = '18 años'
where description = 'Nombra 3 normas importantes que hay en tu casa' and topic = 'politica';

update public.challenges set
  description = '¿Qué día se celebra el Día Internacional de la Mujer?',
  options = array['8 de marzo', '1 de mayo', '25 de noviembre', '10 de diciembre'],
  correct_answer = '8 de marzo'
where description = 'Describe en una frase cómo sería el mundo perfecto' and topic = 'sociedad';

update public.challenges set
  description = '¿Cuál de estas NO es una profesión que ayuda en una emergencia?',
  options = array['Bombero', 'Enfermero', 'Policía', 'Pastelero'],
  correct_answer = 'Pastelero'
where description = 'Nombra 3 profesiones que ayuden a la gente' and topic = 'sociedad';

update public.challenges set
  description = '¿Quién interpreta la canción ''Thriller''?',
  options = array['Michael Jackson', 'Prince', 'Elvis Presley', 'Freddie Mercury'],
  correct_answer = 'Michael Jackson'
where description = 'Tararea una canción para que los demás la adivinen' and topic = 'entretenimiento';

update public.challenges set
  description = '¿Cuál de estas películas ganó el Óscar a mejor película?',
  options = array['Titanic', 'Jurassic Park', 'Matrix', 'Independence Day'],
  correct_answer = 'Titanic'
where description = 'Nombra 3 películas ganadoras del Óscar' and topic = 'entretenimiento';

update public.challenges set
  description = '¿Qué empresa creó el iPhone?',
  options = array['Apple', 'Samsung', 'Google', 'Microsoft'],
  correct_answer = 'Apple'
where description = 'Nombra 3 aplicaciones de móvil que uses cada día' and topic = 'tecnologia';

update public.challenges set
  description = '¿Qué significan las siglas ''IA''?',
  options = array['Inteligencia Artificial', 'Internet Avanzado', 'Información Automática', 'Interfaz Analógica'],
  correct_answer = 'Inteligencia Artificial'
where description = 'Explica qué es la inteligencia artificial en una frase' and topic = 'tecnologia';

update public.challenges set
  description = '¿Qué ingrediente NO lleva una tortilla de patatas tradicional?',
  options = array['Huevo', 'Patata', 'Cebolla', 'Queso'],
  correct_answer = 'Queso'
where description = 'Nombra 5 ingredientes de una tortilla de patatas' and topic = 'comida';

update public.challenges set
  description = '¿De qué país es originaria la pizza?',
  options = array['Italia', 'Francia', 'España', 'Grecia'],
  correct_answer = 'Italia'
where description = 'Describe tu plato ideal sin decir su nombre para que lo adivinen' and topic = 'comida';

update public.challenges set
  description = '¿Cuál es el país más grande del mundo por superficie?',
  options = array['Rusia', 'China', 'Canadá', 'Estados Unidos'],
  correct_answer = 'Rusia'
where description = 'Nombra 5 países que te gustaría visitar' and topic = 'viajes';

update public.challenges set
  description = '¿En qué país está Machu Picchu?',
  options = array['Perú', 'México', 'Bolivia', 'Ecuador'],
  correct_answer = 'Perú'
where description = 'Nombra 5 monumentos famosos del mundo en 20 segundos' and topic = 'viajes';

update public.challenges set
  description = '¿Cuál de estos NO es un continente?',
  options = array['África', 'Oceanía', 'Groenlandia', 'Asia'],
  correct_answer = 'Groenlandia'
where description = 'Nombra los 5 continentes' and topic = 'cultura';

update public.challenges set
  description = '¿Quién pintó ''La Gioconda'' (Mona Lisa)?',
  options = array['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Miguel Ángel'],
  correct_answer = 'Leonardo da Vinci'
where description = 'Nombra 3 obras de arte famosas' and topic = 'cultura';

-- Sanity check: should return 17 (one row per update above).
select count(*) as multiple_choice_challenges from public.challenges where correct_answer is not null;
