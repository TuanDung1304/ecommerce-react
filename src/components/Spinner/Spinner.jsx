import { CircularProgress } from '@mui/material';
import './Spinner.css';

function Spinner() {
  return (
    <div className='spinner-overlay'>
      <div className='spinner-container'>
        <CircularProgress color='warning' />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
