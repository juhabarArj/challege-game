-- Challenge Game PWA — migration 002: admin mode, challenge topic groups,
-- photo/no-photo flag, and an initial challenge bank.
-- Run once in the Supabase Dashboard: SQL Editor > New query > paste > Run
-- (after supabase/schema.sql has already been run — see reference there for
-- the RLS/security note this migration follows the same pattern of).

alter table public.users
  add column if not exists is_admin boolean not null default false;

alter table public.challenges
  add column if not exists topic text,
  add column if not exists requires_photo boolean not null default true;

create index if not exists idx_challenges_topic on public.challenges(topic);

-- Admin CRUD from the client reuses the same permissive anon-key policies as
-- the rest of this MVP (see the security note at the top of schema.sql) —
-- the app gates access to /admin via userProfile.is_admin, not the database.
create policy "public insert challenges" on public.challenges for insert with check (true);
create policy "public update challenges" on public.challenges for update using (true);
create policy "public delete challenges" on public.challenges for delete using (true);

-- Grant yourself admin access. Edit the email if this isn't your account —
-- safe to re-run any time to grant/revoke (it just updates matching rows).
update public.users set is_admin = true where email = 'juhabar@gmail.com';

-- Optional cleanup: test accounts created while debugging the infinite-
-- loading bug (2026-09-22). Uncomment if you want them removed.
-- delete from public.users where email like 'claude-test%@example.com';

-- Seed bank of challenges by topic group. Only run this once — there's no
-- natural unique key on challenges, so running it twice duplicates rows
-- (same caveat as the original seed in schema.sql).
insert into public.challenges (category, topic, description, difficulty, requires_photo) values
  -- Deportes
  ('junior', 'deportes', 'Haz una foto haciendo el gesto de celebrar un gol', 'facil', true),
  ('junior', 'deportes', 'Haz una foto con una pelota o balón de cualquier tipo', 'normal', true),
  ('junior', 'deportes', 'Nombra 5 deportes olímpicos en 15 segundos', 'normal', false),
  ('adult', 'deportes', 'Haz una foto imitando la pose de tu deportista favorito', 'normal', true),
  ('adult', 'deportes', 'Di el nombre de 3 campeones del mundo de fútbol', 'facil', false),
  ('adult', 'deportes', 'Haz una foto haciendo una flexión perfecta', 'dificil', true),

  -- Política (cívico y desenfadado, sin partidismo)
  ('adult', 'politica', 'Nombra 3 países y su capital en 20 segundos', 'facil', false),
  ('adult', 'politica', 'Haz una foto imitando un discurso solemne', 'normal', true),
  ('adult', 'politica', 'Explica en una frase qué es la democracia', 'normal', false),
  ('adult', 'politica', 'Haz una foto vestido/a lo más formal posible en 1 minuto', 'dificil', true),
  ('junior', 'politica', 'Nombra 3 normas importantes que hay en tu casa', 'facil', false),

  -- Sociedad
  ('junior', 'sociedad', 'Haz una foto ayudando a alguien (aunque sea fingido)', 'facil', true),
  ('adult', 'sociedad', 'Describe en una frase cómo sería el mundo perfecto', 'normal', false),
  ('adult', 'sociedad', 'Haz una foto reciclando algo', 'normal', true),
  ('junior', 'sociedad', 'Nombra 3 profesiones que ayuden a la gente', 'facil', false),
  ('adult', 'sociedad', 'Haz una foto representando ''trabajo en equipo'' con objetos', 'dificil', true),

  -- Entretenimiento
  ('junior', 'entretenimiento', 'Haz una foto poniendo cara de tu personaje de película favorito', 'facil', true),
  ('adult', 'entretenimiento', 'Tararea una canción para que los demás la adivinen', 'normal', false),
  ('adult', 'entretenimiento', 'Haz una foto recreando una escena de tu serie favorita', 'normal', true),
  ('adult', 'entretenimiento', 'Nombra 3 películas ganadoras del Óscar', 'facil', false),
  ('junior', 'entretenimiento', 'Haz una foto disfrazado con lo primero que encuentres', 'normal', true),

  -- Tecnología
  ('adult', 'tecnologia', 'Nombra 3 aplicaciones de móvil que uses cada día', 'facil', false),
  ('adult', 'tecnologia', 'Haz una foto con el dispositivo electrónico más antiguo que tengas', 'normal', true),
  ('junior', 'tecnologia', 'Explica qué es la inteligencia artificial en una frase', 'normal', false),
  ('adult', 'tecnologia', 'Haz una foto recreando un robot con tu cuerpo', 'dificil', true),

  -- Comida
  ('junior', 'comida', 'Haz una foto con tu comida favorita (o su envoltorio)', 'facil', true),
  ('adult', 'comida', 'Nombra 5 ingredientes de una tortilla de patatas', 'facil', false),
  ('adult', 'comida', 'Haz una foto poniendo cara de haber probado algo muy picante', 'normal', true),
  ('junior', 'comida', 'Describe tu plato ideal sin decir su nombre para que lo adivinen', 'normal', false),
  ('adult', 'comida', 'Haz una foto haciendo malabares con comida (sin tirarla)', 'dificil', true),

  -- Viajes
  ('adult', 'viajes', 'Nombra 5 países que te gustaría visitar', 'facil', false),
  ('junior', 'viajes', 'Haz una foto con un mapa o una maleta', 'facil', true),
  ('adult', 'viajes', 'Haz una foto haciendo de guía turístico de tu salón', 'normal', true),
  ('adult', 'viajes', 'Nombra 5 monumentos famosos del mundo en 20 segundos', 'dificil', false),

  -- Cultura general
  ('junior', 'cultura', 'Nombra los 5 continentes', 'facil', false),
  ('adult', 'cultura', 'Nombra 3 obras de arte famosas', 'normal', false),
  ('adult', 'cultura', 'Haz una foto recreando una obra de arte famosa con lo que tengas a mano', 'normal', true),
  ('junior', 'cultura', 'Haz una foto formando una letra del abecedario con tu cuerpo', 'dificil', true)
on conflict do nothing;
