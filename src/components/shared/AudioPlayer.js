import React, {useRef, useState} from 'react'
import styled from 'styled-components';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const PlayerWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;

    svg {
        margin-left: 0.5rem;
    }
`;

const CompletionIndicator = styled.div`
    width: ${(props) => `${props.played*100}%`};
    background-color: lightgray;
    transition: width 50ms;
    position: absolute;
    top: 0;
    z-index: -1;
    height: 100%;
`


export default function AudioPlayer(props) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);

    const play = () => {
        setPlaying(true);
        audioRef.current.play();
        const x = setInterval(() => {
            if(audioRef &&  audioRef.current && !audioRef.current.paused) {
                const percentagePlayed = audioRef.current.currentTime / audioRef.current.duration;
                if(percentagePlayed === 1) setPlaying(false);
                setPlayed(percentagePlayed === 1 ? 0 : percentagePlayed) 
            }
            else {
                clearInterval(x)
            }
        }, 50)
    }

    const pause = () => {
        setPlaying(false);
        audioRef.current.pause();
    }

  return (
    <PlayerWrapper>
        <audio preload="auto"
          ref={audioRef}>
            <source src={props.src} type="audio/webm"/>
        </audio>
        {!playing ? 
        <FaPlayCircle onClick={play} size="18"/> : 
        <FaPauseCircle onClick={pause} size="18"/>}
        <CompletionIndicator played={played}/>
    </PlayerWrapper>
  )
}
