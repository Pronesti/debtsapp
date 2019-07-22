import React, {useState} from 'react'
import {Grid, Paper, FormControl, TextField, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    width: '80vw'
  }
}));

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Grid container spacing={3} justify='center' alignItems='center'>
      <Paper className={classes.root}>
        <Typography variant='h5' align='center'>
            Login
        </Typography>
        <FormControl>
          <form>
            <Grid item>
              <TextField
                id='standard-email'
                label='Email'
                className={classes.textField}
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                margin='normal'
                placeholder='Enter Email...'
                autoComplete="email"
              />
            </Grid>
            <Grid item>
              <TextField
                id='standard-password'
                label='Password'
                className={classes.textField}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                margin='normal'
                placeholder='Enter Password...'
                type="password"
                autoComplete="password"
              />
            </Grid>
          </form>
          <Grid item>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={()=> console.log(email + ' : ' + password)}>
            Login
          </Button>
        </Grid>
        </FormControl>
        
      </Paper>
      </Grid>
    )
}

export default Login
