import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../index';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    padding: theme.spacing(3, 2),
    width: '344px'
  }
}));

const AddUser = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: ''
  });
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addUserToFireStore = () => {
    var refDB = db.collection('users');
    refDB.doc().set(
      {
        name: values.name,
        address: values.address,
        phoneNumber: values.phoneNumber,
        email: values.email
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <Grid container spacing={3} justify='center' alignItems='center'>
      <Paper className={classes.root}>
        <Typography variant='h5' align='center'>
          Add User
        </Typography>
        <FormControl style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
          <form>
            <Grid item>
              <TextField
                id='standard-name'
                label='Name'
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin='normal'
                placeholder='Enter name...'
              />
            </Grid>
            <Grid item>
              <TextField
                id='standard-address'
                label='Address'
                className={classes.textField}
                value={values.address}
                onChange={handleChange('address')}
                margin='normal'
                placeholder='Enter address...'
              />
            </Grid>
            <Grid item>
              <TextField
                id='standard-phoneNumber'
                label='PhoneNumber'
                className={classes.textField}
                value={values.phoneNumber}
                onChange={handleChange('phoneNumber')}
                margin='normal'
                placeholder='Enter Phone Number...'
              />
            </Grid>
            <Grid item>
              <TextField
                id='standard-email'
                label='Email'
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin='normal'
                placeholder='Enter Email...'
              />
            </Grid>
          </form>
        </FormControl>
        <Grid item>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleClickOpen}>
            Add
          </Button>
        </Grid>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Create new user?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography>Name: {values.name}</Typography> <br />
            <Typography>Address: {values.address}</Typography> <br />
            <Typography>Phone: {values.phoneNumber} </Typography> <br />
            <Typography>Email: {values.email}</Typography> <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addUserToFireStore} color='primary' autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddUser;
