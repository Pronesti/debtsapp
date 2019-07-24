import React, { useEffect, useState } from 'react';
import { db } from '../index';
import firebase from 'firebase';
import {
  Select,
  MenuItem,
  FormControl,
  Button
} from '@material-ui/core';
import { Grid, Paper, Typography, TextField } from '@material-ui/core';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: 10,
    marginBottom: theme.spacing(3)
  },
  dense: {},
  menu: {
    width: 200
  },
  root: {
    padding: theme.spacing(3, 2),
    width: '344px'
  },
  select: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    padding: 10,
    width: 200
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

const AddDebt = () => {
  const [users, setUsers] = useState([]);
  const [personName, setPersonName] = useState('none');
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  const [userID, setUserID] = useState();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChangeUser = (event) => {
    setPersonName(event.target.value);
    setUserID(users[findWithAttr(users, 'name', event.target.value)].id);
  }

  const handleChangeAmount = event => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const newUser = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(newUser);
      });
  }, []);

  const addDebt = () => {

   if (checkFields() === true){
    var refDB = db.collection('debts');
    refDB.doc().set(
      {
        user: db.doc('users/' + userID),
        value: parseInt(amount, 10),
        date: new Date(moment(date)),
        addTime: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
   }else{
     alert(checkFields())
   }

  };

  const checkFields = () =>{
    let response = true;

    if (userID === ''){
      response = 'ERROR_ID'
    }
    if (personName === 'none' || personName === '') {
      response = 'ERROR_NAME'
    }
    if (amount === 0 || isNaN(amount) ){
      response = 'ERROR_AMOUNT'
    }
    if (moment.isDate(date)){
      response = 'ERROR_DATE'
    }
    console.log(response)
     return response;
  }

  return (
    <Grid container spacing={3} justify='center' alignItems='center'>
      <Paper className={classes.root}>
        <Typography variant='h5' align='center'>
          Add Debt
        </Typography>
        <form >
          <Grid item>
            <FormControl style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
              <Select
                placeholder='Enter amount...'
                className={classes.select}
                autoWidth={false}
                id='adornment-select'
                name='User'
                //displayEmpty
                onChange={handleChangeUser}
                value={personName}
                //input={<Input id='select-multiple-placeholder' />}
                MenuProps={MenuProps}
                inputProps={{
                  name: 'user',
                  id: 'user-simple'
                }}>
                <MenuItem value='none' disabled>
                  Select User
                </MenuItem>
                {users.map(user => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid item>
            <FormControl style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
              <TextField
                className={classes.textField}
                id='adornment-amount'
                value={amount}
                onChange={handleChangeAmount}
                placeholder='Enter amount...'
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item>
          <FormControl style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
          <TextField
        id="date"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />
          </FormControl>
          </Grid>
        </form>
        <Button fullWidth variant='contained' color='primary' onClick={handleClickOpen}>
          Add Debt
        </Button>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Add new debt?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography>Name: {personName}</Typography> <br />
            <Typography>Amount: {amount}</Typography> <br />
            <Typography>Date: {moment(date).format('DD-MM-YY  HH:mm')} </Typography> <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addDebt} color='primary' autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddDebt;
