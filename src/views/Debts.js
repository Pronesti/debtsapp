import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Debts = () => {
    var db = firebase.firestore();
    const [debts,setDebts] = useState([]);

    useEffect( () => {
        firebase
        .firestore()
        .collection('debts')
        .onSnapshot((snapshot) => {
            const newDebt = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setDebts(newDebt)
        })
    }, []);

    const Debt = (index, user, value) => (
        <TableRow key={index}>
              <TableCell component="th" scope="row">
                {user}
              </TableCell>
              <TableCell align="right">{value}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
    )

    return (
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Debts</TableCell>
            <TableCell align="right">$</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {debts.map((debt, index ) => 
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {debt.user.id}
              </TableCell>
              <TableCell align="right">{debt.value}</TableCell>
              <TableCell align="right">date</TableCell>
            </TableRow>
            )}
        </TableBody>
      </Table>
    )
}
//     return(<Debt key={index} user={debt.user.id} value={debt.value} />)
export default Debts
