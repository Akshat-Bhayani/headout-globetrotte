import React from 'react';

const UserAnswerForm = ({ userAnswer, setUserAnswer, handleSubmit, loading }) => {
    return (
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
    );
};

export default UserAnswerForm; 