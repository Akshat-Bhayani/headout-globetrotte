import React from 'react';

const Feedback = ({ feedback, loadNewDestination, loading }) => {
    return (
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
    );
};

export default Feedback; 