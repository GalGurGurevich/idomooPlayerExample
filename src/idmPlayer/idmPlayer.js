import { useRef } from 'react';

export default function IdmPlayer() {
  const playerRef = useRef();
  
  function handlePlayerRef(element) {
    playerRef.current?.dispose();
    if (!element) {
      playerRef.current = null;
      return;
    }

    const player_id = element.id;
    window.idmPlayerCreate({
      player_id,
      src: 'https://v.idomoo.com/3619/0000/nn62v8e1ui11363a74u17vu62428221w3e3h2mp1u3f5sn0.mp4', // can be a dynamic URL
      size: 'HD',
      ratio: '16:9',
      analytics_env: 'us',
      autoplay: false,
      idm_logo: true,
      remove_gif: true,
      mute: false,
    });

    const player = playerRef.current = window[player_id];
    
    player.ready(() => {
      player.on('play', () => player.requestFullscreen());
      player.on('ended', () => player.exitFullscreen());
    });
  }

  return (
    <div className="player_container">
      <div key="player" id="idm_player" ref={handlePlayerRef} />
    </div>
  );
}