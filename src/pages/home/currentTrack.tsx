import { Box, Center, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../../accessToken';

function CurrentlyPlaying() {
  const [trackData, setTrackData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setTrackData(data.item);

        // Refresh the page if the song has been playing for less than 2 seconds
        const progressMs = data.progress_ms;
        if (progressMs < 2000) {
          setTimeout(() => {
            window.location.reload();
          }, 2000 - progressMs); // Adjust timeout to ensure it reloads within 2 seconds
        }
      } catch (error) {
        setError('Error fetching currently playing track.');
        console.error('Error fetching currently playing track:', error);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  return (
    <Center>
      {error && <Text color="red.500">{error}</Text>}
      {trackData ? (
        <Stack direction={"column"} display="flex" alignItems="center">
          <Box w="280px" h="280px" rounded="md" bg="gray.300">
            <Image src={trackData.album.images[0].url} alt="Album Cover" w="280px" h="280px" rounded="md" />
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">{trackData.name}</Text>
            <Text fontSize="sm" fontWeight={"semibold"} color="gray.500">{trackData.artists.map((artist: { name: string }) => artist.name).join(', ')}</Text>
          </Box>
          <Box>
            <Stack direction={"row"}>
                <Text>{`${Math.floor(trackData.duration_ms / 60000)}:${String(Math.floor((trackData.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</Text>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Text>No track currently playing.</Text>
      )}
    </Center>
  );
}

export default CurrentlyPlaying;
