import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', { username });
      localStorage.setItem('userId', response.data._id);
      localStorage.setItem('username', username);
      navigate('/game');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Globetrotter Challenge!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Start Playing</button>
      </form>
    </div>
  );
};

export default Home; 