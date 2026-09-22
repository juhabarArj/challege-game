import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Users
export const createUserProfile = async (userId, email, username, ageGroup) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email,
          username,
          age_group: ageGroup,
          best_score: 0
        }
      ])
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

const fetchUserProfileOnce = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId) => {
  try {
    return await fetchUserProfileOnce(userId);
  } catch (error) {
    // Right after registration, Firebase's auth-state listener can fire this
    // before createUserProfile()'s insert has committed - one short retry
    // covers that race instead of leaving userProfile permanently null.
    if (error.code === 'PGRST116') {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await fetchUserProfileOnce(userId);
      } catch (retryError) {
        console.error('Error fetching user profile (after retry):', retryError);
        return null;
      }
    }
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId, { username, ageGroup }) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ username, age_group: ageGroup })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Game Rooms
export const createGameRoom = async (createdBy, category) => {
  try {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data, error } = await supabase
      .from('game_rooms')
      .insert([
        {
          room_code: roomCode,
          created_by: createdBy,
          category: category,
          players: [{ id: createdBy }],
          status: 'waiting'
        }
      ])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating game room:', error);
    throw error;
  }
};

export const joinGameRoom = async (roomCode, userId) => {
  try {
    // Get room
    const { data: room, error: fetchError } = await supabase
      .from('game_rooms')
      .select('*')
      .eq('room_code', roomCode)
      .single();
    
    if (fetchError) throw fetchError;
    
    if (room.status !== 'waiting') {
      throw new Error('La sala no está disponible');
    }
    
    if (room.players.length >= room.max_players) {
      throw new Error('La sala está llena');
    }
    
    // Add player
    const updatedPlayers = [...room.players, { id: userId }];
    
    const { data, error } = await supabase
      .from('game_rooms')
      .update({ players: updatedPlayers })
      .eq('room_code', roomCode)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error joining game room:', error);
    throw error;
  }
};

export const getGameRoom = async (roomCode) => {
  try {
    const { data, error } = await supabase
      .from('game_rooms')
      .select('*')
      .eq('room_code', roomCode)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching game room:', error);
    return null;
  }
};

// Subscribe to room changes (real-time)
export const subscribeToRoomChanges = (roomCode, callback) => {
  const subscription = supabase
    .channel(`room-${roomCode}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'game_rooms',
        filter: `room_code=eq.${roomCode}`
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
  
  return subscription;
};

// Challenges (simplificado - sin IA por ahora)
export const getChallenges = async (category, limit = 10, topic = null) => {
  try {
    let query = supabase
      .from('challenges')
      .select('*')
      .eq('category', category);

    if (topic) query = query.eq('topic', topic);

    const { data, error } = await query.limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }
};

// Admin: full CRUD over the challenge bank. RLS on `challenges` is permissive
// (see supabase/schema.sql note) - the app itself gates access to this via
// AdminRoute/userProfile.is_admin, not the database.
export const getAllChallenges = async () => {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('topic', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all challenges:', error);
    return [];
  }
};

export const createChallenge = async ({ category, topic, description, difficulty, requiresPhoto, options, correctAnswer }) => {
  const { data, error } = await supabase
    .from('challenges')
    .insert([{
      category,
      topic,
      description,
      difficulty,
      requires_photo: requiresPhoto,
      options: requiresPhoto ? null : options,
      correct_answer: requiresPhoto ? null : correctAnswer,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateChallenge = async (id, { category, topic, description, difficulty, requiresPhoto, options, correctAnswer }) => {
  const { data, error } = await supabase
    .from('challenges')
    .update({
      category,
      topic,
      description,
      difficulty,
      requires_photo: requiresPhoto,
      options: requiresPhoto ? null : options,
      correct_answer: requiresPhoto ? null : correctAnswer,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteChallenge = async (id) => {
  const { error } = await supabase
    .from('challenges')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Game Rounds
export const createGameRound = async (roomCode, roundNumber, playerId, challengeId) => {
  try {
    const { data, error } = await supabase
      .from('game_rounds')
      .insert([
        {
          room_code: roomCode,
          round_number: roundNumber,
          current_player: playerId,
          challenge_id: challengeId,
          is_valid: null,
          points_earned: 0
        }
      ])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating game round:', error);
    throw error;
  }
};

export const updateGameRound = async (roundId, photoUrl, isValid, points) => {
  try {
    const { data, error } = await supabase
      .from('game_rounds')
      .update({
        photo_url: photoUrl,
        is_valid: isValid,
        points_earned: points
      })
      .eq('id', roundId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating game round:', error);
    throw error;
  }
};

// Game Results
export const getGameResults = async (roomCode) => {
  try {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('room_code', roomCode)
      .order('position', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching game results:', error);
    return [];
  }
};

export default supabase;
