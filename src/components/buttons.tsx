import { Button, Center, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { getAccessToken } from '../accessToken';

function Buttons() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the currently playing state on component mount
    fetchCurrentlyPlaying();
  }, []);

  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch currently playing track.');
      }

      const data = await response.json();
      setIsPlaying(data.is_playing);
    } catch (error) {
      setError('Error fetching currently playing track.');
      console.error('Error fetching currently playing track:', error);
    }
  };

  const playSong = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to play song.');
      }

      setIsPlaying(true); // Set playing state to true
    } catch (error) {
      setError('Error playing song.');
      console.error('Error playing song:', error);
    }
  };

  const pauseSong = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to pause song.');
      }

      setIsPlaying(false); // Set playing state to false
    } catch (error) {
      setError('Error pausing song.');
      console.error('Error pausing song:', error);
    }
  };

  const nextTrack = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to go to next track.');
      }

      // Refresh the page to reflect the changes after going to the next track
      window.location.reload();
    } catch (error) {
      setError('Error going to next track.');
      console.error('Error going to next track:', error);
    }
  };

  const previousTrack = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to go to next track.');
      }

      // Refresh the page to reflect the changes after going to the next track
      window.location.reload();
    } catch (error) {
      setError('Error going to next track.');
      console.error('Error going to next track:', error);
    }
  };

  return (
    <Center h="10vh">
      <Stack direction="row" spacing={4}>
        <Button
          onClick={previousTrack}
          _hover={{ transform: 'scale(1.1)' }}
          transition="transform 0.3s ease-in-out"
          boxShadow={"md"}
        >
          <FaStepBackward />
        </Button>
        <div>
          {isPlaying ? (
            <>
              <Button onClick={pauseSong} _hover={{ transform: 'scale(1.1)' }} transition="transform 0.3s ease-in-out" boxShadow={"md"}>
                <FaPause />
              </Button>
            </>
          ) : (
            <Button onClick={playSong} _hover={{ transform: 'scale(1.1)' }} transition="transform 0.3s ease-in-out" boxShadow={"md"}>
              <FaPlay />
            </Button>
          )}
          {error && <Text color="red.500">{error}</Text>}
        </div>
        <Button
          onClick={nextTrack}
          _hover={{ transform: 'scale(1.1)' }}
          transition="transform 0.3s ease-in-out"
          boxShadow={"md"}
        >
          <FaStepForward />
        </Button>
      </Stack>
    </Center>
  );
}

export default Buttons;
