import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
  }
}));

const Weekly = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [monday, setMonday] = useState(moment().startOf('isoWeek'));

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
  }, []);
  
  const week = {
    monday,
    tuesday: moment(monday).add(1, 'days'),
    wednesday: moment(monday).add(2, 'days'),
    thursday: moment(monday).add(3, 'days'),
    friday: moment(monday).add(4, 'days'),
    saturday: moment(monday).add(5, 'days'),
    sunday: moment(monday).add(6, 'days')
  };

  const weekdays = [week.monday, week.tuesday, week.wednesday, week.thursday, week.friday, week.saturday];

  const getTotal = (user, day) => {
    let currentDebts = user.debts.filter(debt =>
      moment(debt.date.toDate()).isSameOrBefore(day)
    );
    let totalDebt = 0;
    currentDebts.forEach(
      debt => (totalDebt = totalDebt + parseInt(debt.value, 10))
    );
    return totalDebt;
  };

  const goBackWeek = () => {
    setMonday(
      moment(monday)
        .startOf('isoWeek')
        .subtract(1, 'weeks')
    );
  };

  const goNextWeek = () => {
    setMonday(
      moment(monday)
        .startOf('isoWeek')
        .add(1, 'weeks')
    );
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'center', alignItems:'center', width: '100%'}}>
      <Button onClick={goBackWeek}>
        <NavigateBefore />
      </Button>
      <Typography style={{display:'inline'}}>{monday.format('MMMM')}</Typography>
      <Button onClick={goNextWeek}>
        <NavigateNext />
      </Button>
      </div>
      <Grid item xs={12}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Name</TableCell>
          {weekdays.map(day =>(
            <TableCell className={classes.tableCell}>{day.format('dddd D')}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell component='th' scope='row' className={classes.tableCell}>
                {user.name}
              </TableCell>
              {weekdays.map(day => (
                <TableCell className={classes.tableCell} style={{color: getTotal(user,day) > 0 ? ('red') : ('green')}}>{getTotal(user, day)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
    </div>
  );
};

export default Weekly;
