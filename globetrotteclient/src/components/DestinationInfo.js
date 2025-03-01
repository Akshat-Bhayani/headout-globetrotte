import React from 'react';

const DestinationInfo = ({ clues }) => {
    return (
        <div className="destination-info">
            {Array.isArray(clues) && clues.map((clue, index) => (
                <p key={index} className="clue">{clue}</p>
            ))}
        </div>
    );
};

export default DestinationInfo; 