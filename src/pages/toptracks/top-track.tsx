import { Badge, Box, Flex } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../../accessToken';

function TopTrack() {
const [ToptrackData, setTopTrackData] = useState<any>(null); // State to store user profile data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserTopTrack();
  }, []);

  const fetchUserTopTrack = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
      }

      const data = await response.json();
      setTopTrackData(data);
    } catch (error) {
      setError('Error fetching user profile.');
      console.error('Error fetching user profile:', error);
    }
  };
  return (
    <div>
  <Flex direction="column" align="center" p={5}>
    {error && <Box color="red.500">{error}</Box>}
    {ToptrackData ? (
      
      <Box
        p={8}
        bg="gray.100"
        borderRadius="2xl"
        width="100%"
        maxWidth="800px"
        boxShadow="md"
      >
        <Flex direction={'row'} align="center" justify="space-between" mb={4} gap={4}>
        {ToptrackData.items.slice(0, 3).map((track: any, index: number) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            justify="center"
            bg={index === 0 ? 'yellow' : index === 1 ? 'gray.300' : index === 2 ? 'orange' : 'black'}
            p={index < 3 ? 6 : 4}
            mb={4}
            borderRadius="lg"
            boxShadow={index < 3 ? 'lg' : 'sm'}
          >
            <Flex align="center" direction={'column'} gap={4}>
              <Badge
                colorScheme={index === 0 ? 'yellow' : index === 1 ? 'gray' : index === 2 ? 'orange' : 'black'}
                fontSize="lg"
                borderRadius="full"
                px={3}
              >
                {index + 1}
              </Badge>
              <Img
                src={track.album.images[0].url}
                rounded={'full'}
                width={'100px'}
                height={'100px'}
              />
              <Box fontWeight={index < 3 ? 'bold' : 'medium'} fontSize={index < 3 ? 'xl' : 'md'}>
                {track.name}
              </Box>
            </Flex>
            <Box color="gray.500">
              {track.artists.map((artist: any) => artist.name).join(', ')}
            </Box>
          </Flex>
        ))}
        </Flex>
        {ToptrackData.items.slice(3, 10).map((track: any, index: number) => (
          <Flex
            key={index}
            align="center"
            justify="space-between"
            bg="gray.50"
            p={6}
            mb={4}
            borderRadius="lg"
            boxShadow="lg"
          >
            <Flex align="center" gap={4}>
              <Box fontWeight="bold" fontSize="lg" color="gray.600">
                {index + 4}
              </Box>
              <Img
                src={track.album.images[0].url}
                rounded="lg"
                width="60px"
                height="60px"
              />
              <Box fontWeight="medium">{track.name}</Box>
            </Flex>
            <Box color="gray.500">
              {track.artists.map((artist: any) => artist.name).join(', ')}
            </Box>
          </Flex>
        ))}
      </Box>
    ) : (
      <Box color="gray.500">No top track found.</Box>
    )}
  </Flex>
</div>
  )
}

export default TopTrack;
