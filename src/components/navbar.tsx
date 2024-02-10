import { Avatar, Box, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import { getAccessToken } from '../accessToken';

function Navbar() {
  const [userData, setUserData] = useState<any>(null); // State to store user profile data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile data on component mount
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError('Error fetching user profile.');
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <Stack direction={"row"} width={"100%"} marginTop={"0.8%"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} padding={"1%"} fontWeight={"bold"}>
            <FaSpotify/>
            <Box > Spotify Player by CHAIYO</Box>
        </Stack>
        <Box bgColor={"gray.200"} marginRight={"2%"} rounded={"md"} display="flex" alignItems="center" _hover={{ bgColor : "gray.400" }} >
            {userData ? (
            <Menu>
            <MenuButton as={Stack} direction="row" alignItems="center" >
                <Stack direction="row" alignItems="center" padding={"0.5rem"}>
                    <Avatar name={userData.display_name} src={userData.images[0].url} size={"xs"} />
                    <Text fontWeight="semibold" ml={2}>{userData.display_name}</Text>
                    <FaChevronDown size={"10"}></FaChevronDown>
                </Stack>
            </MenuButton>
            <MenuList>
                <MenuItem _hover={{ textDecoration: "none" }}>
                    <Link href='https://developer.spotify.com/documentation/web-api/concepts/access-token' isExternal>
                    Get your own access token here
                    </Link>
                </MenuItem>
                <MenuItem _hover={{ textDecoration: "none" }}>
                    <Link href='https://developer.spotify.com/' isExternal>
                    Spotify Developer Docs
                    </Link>
                </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box>Loading...</Box>
        )}
      </Box>
    </Stack>
  );
}

export default Navbar;
