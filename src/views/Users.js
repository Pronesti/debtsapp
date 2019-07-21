import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Moment from 'react-moment';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('debts')
      .onSnapshot(snapshot => {
        let debtsArray = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        //second query
        firebase.firestore().collection('users').onSnapshot(snapshot => {
        let usersArray = snapshot.docs.map(doc => {
            let userDebts = debtsArray.filter(obj => obj.user.id === doc.id);
            let totalDebt = 0;
            userDebts.forEach(debt => totalDebt = totalDebt + parseInt(debt.value, 10));
            return {
                id: doc.id,
                debts: userDebts,
                totalDebt,
                ...doc.data()
            }
        })
        setUsers(usersArray)
        })
      });
  }, []);

  const colorize = debt => {
    if (debt > 0) {
      return 'red';
    } else {
      return 'green';
    }
  };

  return (
    <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align='right'>$</TableCell>
        <TableCell align='right'>Phone Number</TableCell>
        <TableCell align='right'>Address</TableCell>
        <TableCell align='right'>Email</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user, index) => (
        <TableRow key={index}>
          <TableCell component='th' scope='row'>
            {user.name}
          </TableCell>
          <TableCell
            align='right'
            style={{ color: `${colorize(user.totalDebt)}` }}>
            {user.totalDebt}
          </TableCell>
          <TableCell align='right'>
          {user.phoneNumber}
          </TableCell>
          <TableCell align='right'>
          {user.address}
          </TableCell>
          <TableCell align='right'>
          {user.email}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  );
};

export default Users;
