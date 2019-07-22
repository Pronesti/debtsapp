import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import moment from 'moment'

import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Button,
    Typography
  } from '@material-ui/core';
  import { NavigateNext, NavigateBefore } from '@material-ui/icons';

const Daily = () => {
    const [users, setUsers] = useState([])
    const [day, setDay] = useState(moment())

    useEffect(() => {
        firebase
          .firestore()
          .collection('debts')
          .onSnapshot(snapshot => {
            let debtsArray = snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() };
            });
            //second query
            firebase
              .firestore()
              .collection('users')
              .onSnapshot(snapshot => {
                let usersArray = snapshot.docs.map(doc => {
                  let userDebts = debtsArray.filter(obj => obj.user.id === doc.id);
                  userDebts = userDebts.filter(debt => moment(debt.date.toDate()).isSame(day, 'day'))
                  let totalDebt = 0;
                  userDebts.forEach(
                    debt => (totalDebt = totalDebt + parseInt(debt.value, 10))
                  );
                  return {
                    id: doc.id,
                    debts: userDebts,
                    totalDebt,
                    ...doc.data()
                  };
                });
                setUsers(usersArray);
              });
          });
      }, [day]);

      const goBackDay = () => {
        setDay(
          moment(day)
            .subtract(1, 'days')
        );
      };
    
      const goNextDay = () => {
        setDay(
          moment(day)
            .add(1, 'days')
        );
      };

    return (
        <div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
        <Button onClick={goBackDay}>
          <NavigateBefore />
        </Button>
        <Typography style={{display:'inline'}}>{day.format('dddd D')}</Typography>
        <Button onClick={goNextDay}>
          <NavigateNext />
        </Button>
        </div>
        <Table>
        <TableHead>
        <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Debts</TableCell>
        <TableCell>Total</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {users.map(user => (
            <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableRow>
        {user.debts.map(debt=>(
            <TableCell style={{color: debt.value > 0 ? ('red') : ('green')}}>{debt.value}</TableCell>
        ))}
        </TableRow>
        <TableCell>{user.totalDebt}</TableCell>
        </TableRow>
        ))}
        </TableBody>
        </Table>    
        </div>
    )
}

export default Daily
