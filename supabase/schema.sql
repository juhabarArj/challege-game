-- Challenge Game PWA — Supabase schema
-- Run this once in the Supabase Dashboard: SQL Editor > New query > paste > Run
--
-- Auth note: this app authenticates with Firebase, not Supabase Auth, and the
-- frontend talks to Supabase with the public anon key (see src/services/supabase.js).
-- That means Postgres has no verified per-request identity (no auth.uid()), so the
-- RLS policies below are permissive by necessity — they stop the obvious bad case
-- (raw table access with no key at all) but do NOT stop one signed-in player from
-- editing another player's row via the browser console. Fine for an MVP hobby game;
-- revisit with Supabase Third-Party Auth (Firebase) before this holds anything sensitive.

-- USERS: app profile, created client-side right after Firebase registerUser() succeeds
-- (see createUserProfile in src/services/supabase.js). id = Firebase Auth UID.
create table if not exists public.users (
  id text primary key,
  email text not null,
  username text not null,
  age_group text not null check (age_group in ('junior', 'adult')),
  best_score integer not null default 0,
  created_at timestamptz not null default now()
);

-- GAME ROOMS: players is a jsonb array of {id}; game_players.js in STATUS.md's
-- original plan was dropped in favor of this inline array, matching the actual code.
create table if not exists public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique,
  created_by text not null references public.users(id),
  category text not null check (category in ('junior', 'adult')),
  players jsonb not null default '[]'::jsonb,
  max_players integer not null default 6,
  status text not null default 'waiting' check (status in ('waiting', 'playing', 'finished')),
  created_at timestamptz not null default now()
);

-- CHALLENGES: seeded below, read via getChallenges(category)
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('junior', 'adult')),
  description text not null,
  difficulty text not null default 'normal',
  created_at timestamptz not null default now()
);

-- GAME ROUNDS: one row per player turn
create table if not exists public.game_rounds (
  id uuid primary key default gen_random_uuid(),
  room_code text not null references public.game_rooms(room_code),
  round_number integer not null,
  current_player text not null references public.users(id),
  challenge_id uuid references public.challenges(id),
  photo_url text,
  is_valid boolean,
  points_earned integer not null default 0,
  created_at timestamptz not null default now()
);

-- GAME RESULTS: final standings per room, read ordered by position
create table if not exists public.game_results (
  id uuid primary key default gen_random_uuid(),
  room_code text not null references public.game_rooms(room_code),
  user_id text not null references public.users(id),
  score integer not null default 0,
  position integer,
  created_at timestamptz not null default now()
);

-- Indexes used by the app's lookups (room_code, category)
create index if not exists idx_game_rounds_room_code on public.game_rounds(room_code);
create index if not exists idx_game_results_room_code on public.game_results(room_code);
create index if not exists idx_challenges_category on public.challenges(category);

-- Realtime: subscribeToRoomChanges() listens for postgres_changes on game_rooms
alter publication supabase_realtime add table public.game_rooms;

-- Row Level Security
alter table public.users enable row level security;
alter table public.game_rooms enable row level security;
alter table public.challenges enable row level security;
alter table public.game_rounds enable row level security;
alter table public.game_results enable row level security;

-- Permissive MVP policies (anon key, no verified identity — see note above)
create policy "public read users" on public.users for select using (true);
create policy "public insert users" on public.users for insert with check (true);
create policy "public update users" on public.users for update using (true);

create policy "public read game_rooms" on public.game_rooms for select using (true);
create policy "public insert game_rooms" on public.game_rooms for insert with check (true);
create policy "public update game_rooms" on public.game_rooms for update using (true);

create policy "public read challenges" on public.challenges for select using (true);

create policy "public read game_rounds" on public.game_rounds for select using (true);
create policy "public insert game_rounds" on public.game_rounds for insert with check (true);
create policy "public update game_rounds" on public.game_rounds for update using (true);

create policy "public read game_results" on public.game_results for select using (true);
create policy "public insert game_results" on public.game_results for insert with check (true);

-- Seed challenges so getChallenges() has data to return
insert into public.challenges (category, description, difficulty) values
  ('junior', 'Haz una foto poniendo cara de sorpresa', 'facil'),
  ('junior', 'Haz una foto con algo de color amarillo', 'facil'),
  ('junior', 'Haz una foto imitando a tu animal favorito', 'normal'),
  ('junior', 'Haz una foto con tres objetos redondos', 'normal'),
  ('junior', 'Haz una foto de tu peinado más raro', 'dificil'),
  ('adult', 'Haz una foto con una prenda puesta al revés', 'facil'),
  ('adult', 'Haz una foto recreando la portada de tu álbum favorito', 'normal'),
  ('adult', 'Haz una foto haciendo una pose de yoga', 'normal'),
  ('adult', 'Haz una foto con el objeto más viejo que tengas a mano', 'dificil'),
  ('adult', 'Haz una foto imitando a un famoso', 'dificil')
on conflict do nothing;
