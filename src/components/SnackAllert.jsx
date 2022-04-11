import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackAllert = ({ allertMessage, open, onClose, type }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {allertMessage}
      </Alert>
    </Snackbar>
  )
};

export default SnackAllert;