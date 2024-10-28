import React from 'react';
import './PlayButton.css';

interface PlayButtonProps {
    onClick: () => void; 
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
    return (
        <div className="play-button-container" onClick={onClick}>
            <div className="play-button">
                <div className="play-icon"></div>
            </div>
        </div>
    );
};

export default PlayButton;
