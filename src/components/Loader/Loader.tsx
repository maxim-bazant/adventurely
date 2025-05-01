import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import { getCssVariable } from '../../styles/getCssVariable';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message }: LoaderProps) {
  return (
    <Backdrop
      open={true}  // Controls the visibility of the backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,  // Ensures it's above other content
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Semi-transparent dark background
      }}
    >
      <CircularProgress size="3rem" sx={{
        color: getCssVariable('--text-color'),  // Uses the text color from the CSS variables
      }}/>
      {message && <h2 style={{ marginLeft: '1rem' }}>{message}</h2>}
    </Backdrop>
  );
}
