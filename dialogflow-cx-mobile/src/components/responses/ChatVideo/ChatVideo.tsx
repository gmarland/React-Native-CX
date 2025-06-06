import React, { useEffect, useState, useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface ChatVideoProps {
  url: string;
}

const ChatVideo: React.FC<ChatVideoProps> = ({ url }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const paddedWidth = width - 40; // Assuming 16px padding on each side
  const height = (width / 16) * 9;

  const extractVideoId = useCallback((videoUrl: string): string | null => {
    const matches = videoUrl.match(
      /(?:youtube\.com\/(?:.*v=|.*\/|.*videos\/|.*embed\/|.*shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return matches && matches.length > 0 && matches[1] ? matches[1] : null;
  }, []);

  useEffect(() => {
    setVideoId(url ? extractVideoId(url) : null);
  }, [url, extractVideoId]);

  if (!videoId) {
    return null;
  }

  return (
    <YoutubePlayer width={paddedWidth} height={height} videoId={videoId} />
  );
};

export default ChatVideo;
