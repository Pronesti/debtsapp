import React from 'react'
import {TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {db} from '../index'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));



const AddUser = () => {

    const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    total: 0,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addUserToFireStore = () => {
    var refDB = db.collection('users');
    refDB.doc().set({
        name: values.name,
        total: values.total 
    }, { merge: true });
    
  }

    return (
        <div>
            <form>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        placeholder="Enter name..."
      />
      <TextField
        id="standard-number"
        label="Total"
        value={values.total}
        onChange={handleChange('total')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <Button onClick={()=>addUserToFireStore()}>Add</Button>
            </form>
        </div>
    )
}

export default AddUser
