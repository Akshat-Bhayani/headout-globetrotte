import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useParams } from "react-router-dom";
import destinationApi from "../services/api";
import ScoreBoard from "./ScoreBoard";
import DestinationInfo from "./DestinationInfo";
import Feedback from "./Feedback";
import UserAnswerForm from "./UserAnswerForm";
import InviteFriend from "./InviteFriend";

const API_URL = "http://localhost:5000/api";

const Game = () => {
  const { inviteCode } = useParams();
  const [currentDestination, setCurrentDestination] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friendUser, setFriendUser] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      getUserDetails(storedUserId);
    }

    if (inviteCode) {
      fetchInviterScore();
    }
    loadNewDestination();
  }, [inviteCode]);

  const getUserDetails = async (storedUserId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${storedUserId}`);
      // setUserDetails(response.data);
      // setScore(response.data.)
      console.log(response.data);
      console.log("User Details:", response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details");
    }
  };

  const fetchInviterScore = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/invite/${inviteCode}`);
      // Handle the score data if needed
    } catch (error) {
      console.error("Error fetching inviter score:", error);
      setError("Failed to fetch inviter score");
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
        setUserAnswer("");
      } else {
        setError("No destination data received");
      }
    } catch (error) {
      console.error("Error loading destination:", error);
      setError("Failed to load destination");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await destinationApi.verifyAnswer(
        currentDestination._id,
        { answer: userAnswer, username, userId }
      );
      const { isCorrect } = response.data;

      if (isCorrect) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }

      setFeedback(response.data);
    } catch (error) {
      console.error("Error verifying answer:", error);
      setError("Failed to verify answer");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const shareInvite = async () => {
    if (!friendUser) {
      alert("Please enter a username");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/unique",
        { username: friendUser }
      );
      if (!response.data.isUniqueUser) {
        alert("Enter unique username");
        return;
      }
      const link = `${window.location.origin}/game/${response.data.inviteCode}`;
      navigator.clipboard
        .writeText(link)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    } catch (error) {
      setError("Failed to create an invite");
    }
  };

  return (
    <div className="game-container">
      {error && <div className="error-message">{error}</div>}
      {showConfetti && <Confetti />}

      <ScoreBoard correct={score.correct} incorrect={score.incorrect} />

      {currentDestination && (
        <DestinationInfo clues={currentDestination.clues} />
      )}

      <UserAnswerForm
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {feedback && (
        <Feedback
          feedback={feedback}
          loadNewDestination={loadNewDestination}
          loading={loading}
        />
      )}

      <InviteFriend
        friendUser={friendUser}
        setFriendUser={setFriendUser}
        shareInvite={shareInvite}
      />

      <div className="username-input">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Game;


// bhayaniakshat1607 2dxH96dGErSkahmB