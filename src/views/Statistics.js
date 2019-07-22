import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
//import moment from 'moment'
import {Paper,Typography} from '@material-ui/core'

const Statistics = () => {
    const [users, setUsers] = useState([]);
    const [debts, setDebts] = useState([]);

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
            setDebts(debtsArray)
            })
          });
      }, []);

      const totalDebt = () => {
          console.log(users[0])
          let total = 0;
          users.forEach(user => total = total + parseInt(user.totalDebt, 10));
        return total;
      }

      

    return (
        <div>
            <Paper>
            <Typography>Total Users: {users.length}</Typography>
            <Typography> Total Movements: {debts.length}</Typography>
            <Typography>Total Debt: ${totalDebt()}</Typography>
            </Paper>
        </div>
    )
}

export default Statistics
