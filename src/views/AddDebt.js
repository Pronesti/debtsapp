import React, {useEffect,useState} from 'react'
import {db} from '../index';
import firebase from 'firebase';
import {Select, MenuItem, Input, FormControl, InputLabel, InputAdornment,Button} from '@material-ui/core'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

const AddDebt = () => {
    const [users, setUsers] = useState([]);
    const [personName, setPersonName] = useState([]);
    const [amount, setAmount] = useState(0)
    const [userID, setUserID] = useState()

    function handleChangeUser(event) {
      setPersonName(event.target.value);
      setUserID(users[findWithAttr(users, 'name', event.target.value)].id); 
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value)
      };

    useEffect( () => {
        firebase
        .firestore()
        .collection('users')
        .onSnapshot((snapshot) => {
            const newUser = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(newUser)
        })
    }, []);

    const addDebt = () => {
        var refDB = db.collection('debts');
        refDB.doc().set({
            user: db.doc('users/' + userID),
            value: amount,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        
    }
    return (
        <div>
        <FormControl>
        <Select
          name="User"
          displayEmpty
          onChange={handleChangeUser}
          value={personName}
          input={<Input id="select-multiple-placeholder" />}
          renderValue={selected => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Select User</em>
          </MenuItem>
          {users.map(user => (
            <MenuItem key={user.id} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
        <Input
          id="adornment-amount"
          value={amount}
          onChange={handleChangeAmount}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <Button onClick={addDebt}>Add Debt</Button>
        </div>
    )
}

export default AddDebt
