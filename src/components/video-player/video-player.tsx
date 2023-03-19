import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import Hls from 'hls.js';
import theme from '../../styles';

interface Props {
    url: string;
}

const VideoPlayer = ({ url }: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = url;
        }

        // Get saved playback position
        const savedPosition = localStorage.getItem(`video_position_${url}`);
        if (savedPosition) {
            videoRef.current.currentTime = parseFloat(savedPosition);
        }

        // Save playback position on unload
        const handleUnload = () => {
            localStorage.setItem(`video_position_${url}`, videoRef.current?.currentTime.toString() ?? '');
        };
        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, [url]);

    const handleTimeUpdate = () => {
        // Save playback position
        localStorage.setItem(`video_time_${url}`, videoRef.current?.currentTime.toString() ?? '');
    };

    return (
        <video width={isMobile ? 300 : 600} controls ref={videoRef} onTimeUpdate={handleTimeUpdate}>
            <source src={url} type="application/x-mpegURL" />
        </video>
    );
};

export default VideoPlayer;
