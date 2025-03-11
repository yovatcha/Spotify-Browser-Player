// src/components/atinput.tsx

import { Button, Input, InputGroup, InputLeftElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { setAccessToken } from '../accessToken';

function AtInput() {
  const [accessToken, setAccessTokenState] = useState('');

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessTokenState(e.target.value);
  };

  const handleSubmit = () => {
    setAccessToken(accessToken);
    console.log(`Access Token: ${accessToken}`);
    setAccessTokenState('');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Access Token</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Insert Access Token Here!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaSpotify color='gray.300' />
              </InputLeftElement>
              <Input placeholder='Your Access Token' value={accessToken} onChange={handleAccessTokenChange} />
            </InputGroup>
          </PopoverBody>
          <PopoverFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default AtInput;
