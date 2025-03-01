import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useParams } from 'react-router-dom';
import destinationApi from '../services/api';
import ModalComponent from './ModalComponent';

const API_URL = 'http://localhost:5000/api';

const Game = () => {
  const { inviteCode } = useParams();
  const [currentDestination, setCurrentDestination] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friendUser,setFriendUser] = useState('');
  const [inviteLink,setInviteLink] = useState('');

  useEffect(() => {
    if (inviteCode) {
      fetchInviterScore();
    }
    loadNewDestination();
  }, [inviteCode]);

  const fetchInviterScore = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/invite/${inviteCode}`);
      // Handle the score data if needed
    } catch (error) {
      console.error('Error fetching inviter score:', error);
      setError('Failed to fetch inviter score');
    }
  };

  const loadNewDestination = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await destinationApi.getRandomDestination();
      if (response.data) {
        setCurrentDestination(response.data);
        setFeedback(null);
        setUserAnswer('');
      } else {
        setError('No destination data received');
      }
    } catch (error) {
      console.error('Error loading destination:', error);
      setError('Failed to load destination');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentDestination?._id || !userAnswer.trim()) {
      setError('Please enter an answer');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await destinationApi.verifyAnswer(currentDestination._id, userAnswer);
      const { isCorrect, correctAnswer, message } = response.data;

      if (isCorrect) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }

      setFeedback(response.data);
    } catch (error) {
      console.error('Error verifying answer:', error);
      setError('Failed to verify answer');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const shareInvite = async() => {
    if(!friendUser){
      alert('Please enter a username');
    }
    try{

      const response = await axios.post('http://localhost:5000/api/users/unique',{username : friendUser});
      if(!response.data.isUniqueUser){
        alert('Enter unique username');
        return;
      }
      const link = `${window.location.origin}/game/${inviteCode}`;
      setInviteLink(link);
    }catch(error){
      setError('Failed to create an invite');
    }
  };

  const handleUsernameChange = (event) => {
    setFriendUser(event.target.value);
  }


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Copied to clipboard!');
        })
        .catch((err) => {
            console.error('Failed to copy:', err);
        });
  };
  const handleModalOnClose = () => {
    setInviteLink('');
  }

  return (
    <div className="game-container">
      {error && <div className="error-message">{error}</div>}
      {showConfetti && <Confetti />}
      
      <div className="score-board">
        <span>Correct: {score.correct}</span>
        <span>Incorrect: {score.incorrect}</span>
      </div>

      {currentDestination && (
        <div className="destination-info">
          {Array.isArray(currentDestination.clues) && currentDestination.clues.map((clue, index) => (
            <p key={index} className="clue">{clue}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your guess..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !userAnswer.trim()}>
          Submit Answer
        </button>
      </form>

      {feedback && (
        <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <h3>{feedback.isCorrect ? '🎉 Correct!' : '😢 Incorrect'}</h3>
          <p>The destination was: {feedback.destination || 'Unknown'}</p>
          {Array.isArray(feedback.funFacts) && feedback.funFacts.length > 0 && (
            <div className="fun-facts">
              <h4>Fun Facts:</h4>
              {feedback.funFacts.map((fact, index) => (
                <p key={index}>{fact}</p>
              ))}
            </div>
          )}
          {feedback.trivia && <p className="trivia">Trivia: {feedback.trivia}</p>}
          <button onClick={loadNewDestination} disabled={loading}>
            Next Destination 
          </button>
        </div>
      )}

      <div className='inviteFriend'>
        <div className='inviteFriendInput'>
          <input type = 'text' placeholder = 'Enter unique username' onChange={handleUsernameChange} value = {friendUser}/>
        </div>
        <button onClick = {shareInvite}> Invite a friend</button>
      </div>
      {/* <ModalComponent 
    open={!!inviteLink} 
    onClose={handleModalOnClose}  
    confirmText='Copy' 
    onConfirm={() => copyToClipboard(inviteLink)} 
    inviteLink={inviteLink}
/> */}



    </div>
  );
};

export default Game;
