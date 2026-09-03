import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import GameBoard from './pages/GameBoard';
import Leaderboard from './pages/Leaderboard';

// Components
import Loading from './components/Common/Loading';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router basename="/challege-game">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={<PrivateRoute><Home /></PrivateRoute>} 
        />
        <Route 
          path="/lobby/:roomCode" 
          element={<PrivateRoute><Lobby /></PrivateRoute>} 
        />
        <Route 
          path="/game/:roomCode" 
          element={<PrivateRoute><GameBoard /></PrivateRoute>} 
        />
        <Route 
          path="/results/:roomCode" 
          element={<PrivateRoute><Leaderboard /></PrivateRoute>} 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
