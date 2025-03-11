import { Box } from '@chakra-ui/react';
import Navbar from '../../components/navbar';

function ErrorPage() {
  return (
    <>
    <Navbar/>
    <Box color={'whitesmoke'} bgColor={'coral'} justifyContent={'center'} padding={'10'}>
      <h2>404 - Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
    </Box>
    </>
  );
}

export default ErrorPage;