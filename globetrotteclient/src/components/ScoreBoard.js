import React from 'react';

const ScoreBoard = ({ correct, incorrect }) => {
    return (
        <div className="score-board">
            <span>Correct: {correct}</span>
            <span>Incorrect: {incorrect}</span>
        </div>
    );
};

export default ScoreBoard; 