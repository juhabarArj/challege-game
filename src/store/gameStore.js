import { create } from 'zustand';

export const useGameStore = create((set) => ({
  // Room state
  currentRoom: null,
  roomCode: null,
  players: [],
  category: 'junior', // junior | adult

  // Game state
  gameStatus: 'idle', // idle | waiting | playing | finished
  currentRound: 0,
  currentPlayerIndex: 0,
  currentChallenge: null,
  scores: {},

  // Turn state
  photoData: null,
  validationResult: null,
  isValidating: false,

  // Actions
  setRoom: (room) => set({ currentRoom: room }),
  setRoomCode: (code) => set({ roomCode: code }),
  setPlayers: (players) => set({ players }),
  setCategory: (category) => set({ category }),
  
  setGameStatus: (status) => set({ gameStatus: status }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentPlayerIndex: (index) => set({ currentPlayerIndex: index }),
  setCurrentChallenge: (challenge) => set({ currentChallenge: challenge }),
  
  setPhotoData: (data) => set({ photoData: data }),
  setValidationResult: (result) => set({ validationResult: result }),
  setIsValidating: (loading) => set({ isValidating: loading }),
  
  updateScore: (playerId, points) => set((state) => ({
    scores: {
      ...state.scores,
      [playerId]: (state.scores[playerId] || 0) + points
    }
  })),

  resetGame: () => set({
    currentRoom: null,
    roomCode: null,
    players: [],
    gameStatus: 'idle',
    currentRound: 0,
    currentPlayerIndex: 0,
    currentChallenge: null,
    scores: {},
    photoData: null,
    validationResult: null,
    isValidating: false
  }),
}));
