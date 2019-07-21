import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment';

const Debts = () => {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const usersArray = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        firebase
          .firestore()
          .collection('debts')
          .orderBy('date', 'desc')
          .onSnapshot(snapshot => {
            console.log(snapshot.docs[0].data());
            const newDebt = snapshot.docs.map(doc => {
              const userToQuery = doc.data().user.id;
              const position = usersArray.findIndex(
                obj => obj.id === userToQuery
              );
              return {
                id: doc.id,
                userInfo: usersArray[position],
                ...doc.data()
              };
            });
            setDebts(newDebt);
            console.log(newDebt);
          });
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align='right'>$</TableCell>
          <TableCell align='right'>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {debts.map((debt, index) => (
          <TableRow key={index}>
            <TableCell component='th' scope='row'>
              {debt.userInfo.name}
            </TableCell>
            <TableCell
              align='right'
              style={{ color: `${colorize(debt.value)}` }}>
              {debt.value}
            </TableCell>
            <TableCell align='right'>
              <Moment fromNowDuring={86400000} format='HH:mm | DD-MM-YY'>
                {debt.date.toDate()}
              </Moment>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
//     return(<Debt key={index} user={debt.user.id} value={debt.value} />)
export default Debts;
