import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const SnackDeleteAlert = ({ messageAlert, open, handleClose, undo }) => {
  return (
    <Snackbar
      sx={{ width: '300px' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity="info"
        sx={{ width: '100%' }}
        action={
          <Button
            sx={{ color: 'white', fontWeight: '700' }}
            size="small"
            onClick={undo}
          >
            UNDO
          </Button>
        }
      >
        {messageAlert}
      </Alert>
    </Snackbar>
  )
};

export default SnackDeleteAlert;