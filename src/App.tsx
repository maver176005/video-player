import React, { useRef } from 'react';
import { Modal } from 'antd';
import { useMachine } from '@xstate/react';
import { FullscreenOutlined, PauseOutlined, PlayCircleOutlined, ShrinkOutlined } from '@ant-design/icons';
import PlayButton from './components/PlayButton';
import ReactPlayer from 'react-player';
import playerMachine from '../src/machines/playerMachine';
import './App.css';

const App = () => {
    const [state, send] = useMachine(playerMachine);
    const playerRef = useRef<ReactPlayer | null>(null);

    const togglePlayPause = () => {
        if (state.matches('playing') || state.matches('minimizedPlaying')) {
            send({ type: 'PAUSE' });
        } else {
            send({ type: 'PLAY' });
        }
    };

    const toggleFullScreen = () => {
        if (playerRef.current) {
            const player = playerRef.current.getInternalPlayer();
            player?.requestFullscreen?.();
        }
    };

    const toggleMinimize = () => {
        if (state.matches('minimizedPlaying') || state.matches('minimizedPaused')) {
            send({ type: 'TOGGLE_MAXIMIZE' });
        } else {
            send({ type: 'TOGGLE_MINIMIZE' });
        }
    };

    return (
        <div className="app-container">
            {/* Кнопка для начального открытия модального окна */}
            <PlayButton onClick={() => send({ type: 'PLAY' })} />
            
            <Modal
                open={state.matches('playing') || state.matches('paused') || state.matches('minimizedPlaying') || state.matches('minimizedPaused')}
                onCancel={() => send({ type: 'STOP' })}  // Закрытие модалки возвращает в idle
                closable={false}
                footer={null}
                width={state.matches('minimizedPlaying') || state.matches('minimizedPaused') ? 300 : 800}
                centered
                title={
                    <div className="modal-header">
                        <span className="modal-title">PLAYER</span>
                        <button onClick={() => send({ type: 'STOP' })} className="close-btn">✕</button>
                    </div>
                }
            >
                <div className={`video-container ${state.matches('minimizedPlaying') || state.matches('minimizedPaused') ? 'minimized' : ''}`}>
                    <ReactPlayer
                        ref={playerRef}
                        url="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
                        playing={state.matches('playing') || state.matches('minimizedPlaying')}
                        controls={false}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="controls">
                    <button onClick={togglePlayPause} className="control-btn ant-btn ant-btn-circle ant-btn-default ant-btn-icon-only">
                        {state.matches('playing') || state.matches('minimizedPlaying') ? <PauseOutlined /> : <PlayCircleOutlined />}
                    </button>
                    <button onClick={toggleFullScreen} className="control-btn ant-btn ant-btn-circle ant-btn-default ant-btn-icon-only">
                        <FullscreenOutlined />
                    </button>
                    <button onClick={toggleMinimize} className="control-btn minimize-btn ant-btn ant-btn-circle ant-btn-default ant-btn-icon-only">
                        <ShrinkOutlined className={`arrow ${state.matches('minimizedPlaying') || state.matches('minimizedPaused') ? 'arrow-outward' : 'arrow-inward'}`} />
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default App;
