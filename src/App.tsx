import { Box, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Buttons from '../src/pages/home/buttons';
import CurrentTrack from '../src/pages/home/currentTrack';
import './App.css';
import { getAccessToken } from './accessToken';
import Navbar from './components/navbar';

function App() {
  const [data, setData] = useState<any>(null); // State to store currently playing
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

      const data = await response.json();
        setData(data.item);

      setRefreshKey(prevKey => prevKey + 0); // Trigger refresh of CurrentTrack component
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
    }
  };

  return (
    <Stack direction={"column"}>
  <Navbar />
  <Flex
  className="App"
  direction="column"
  justify="center"
  align="center"
  minHeight="100vh"
  position="relative" // Ensures stacking of child elements
>
  {/* Background Layer */}
  <Box
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    style={{
      backgroundImage: `url(${data?.album?.images[0]?.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    _after={{
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}
  />

  <Box
    position="relative"
    width="80%"
    bgColor="whiteAlpha.700"
    rounded="xl"
    shadow="xl"
    p={6}
  >
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
