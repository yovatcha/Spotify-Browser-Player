import { Box, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import { getAccessToken } from './accessToken';
import Buttons from './components/buttons';
import CurrentTrack from './components/currentTrack';
import Navbar from './components/navbar';

function App() {
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh of CurrentTrack component

  useEffect(() => {
    // Fetch the currently playing state on component mount
    fetchCurrentlyPlaying();
  }, []);

  useEffect(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  }, [refreshKey]);

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

      setRefreshKey(prevKey => prevKey + 1); // Trigger refresh of CurrentTrack component
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
    }
  };

  return (
    <Stack direction={"column"}>
  <Navbar />
    <Flex className="App" direction="column" justify="center" align="center" minHeight="100vh" style={{ backgroundColor }} shadow="md">
      <Box width="80%" bgColor="white" rounded="xl" shadow="xl" p={6}>
        <Stack direction="column" spacing={6} p={4}>
          <CurrentTrack />
          <Buttons />
        </Stack>
      </Box>
    </Flex>
    </Stack>
  );
}

export default App;
