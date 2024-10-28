import React from 'react';
import PlayButton from './PlayButton.js';

const VideoPlayer = ({ onPlay }) => {
    return (
        <div>
            <PlayButton onClick={onPlay}>Open Player</PlayButton>
        </div>
    );
};

export default VideoPlayer;
