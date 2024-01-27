import React, { useState, useEffect } from 'react';
import classes from "./row.module.css"
import MyModal from '../MyModal/MyModal';
import MouseMove from '../MyMouseMove/MouseMove';

const Table = ({users}) => {
    
    const [drag, setDrag] = useState(false)
    const [modal, setModal] = useState(false)
    const [idUser, setIdUser] = useState('')
    const [user, setUser] = useState([])
    
// fetch query with sequential display of the modal window if the event is triggered
    const fetchData = (query) => {                  
          fetch(query)
          .then(response => {return response.json()})
          .then(data =>  {setUser(data.users);
                         if (idUser.length >= 1)
                            setModal(true)})  
            .catch((err) => 
            console.error("Could not fetch: "  + err))              
      }
     useEffect(() => {
        fetchData("https://dummyjson.com/users/filter?key=id&value=" + idUser)
     }, [idUser])
     
    const arr = users.map(i=>{
        return [i.id, i.firstName, i.lastName,
                i.maidenName, i.age, i.gender,
                i.phone, i.address.city, 
                i.address.address];
    })
    if (!users.length){
        return (
        <h1 style={{textAlign: "center"}}>Users not found!</h1>
        )}
    return (
        <div>
            {users.length > 0 && (
            <div>
            <h1>Users table</h1>
                <table>
                <thead><td>id</td><td>firstName</td><td>lastName</td><td>maidenName</td><td>age</td><td>gender</td><td>phone</td><td>city</td><td>address</td></thead>
                <tbody>
                    {arr.map((row, i) => 
                    <tr key={arr[i][0]} id = {arr[i][0]} className="arr"> 
                        { 
                        row.map((col, j) => 
                            <td  key = {j} id = {`${i}${j}`}
                            onClick={(e) => 
                            {if (e.target.parentElement.matches('tr.arr')){ // Check click on text row or not dragger
                                setIdUser(e.target.parentElement.id)}}
                            }
                            >
                                {arr[i][j]}
                            <div 
                                className   = {classes.Dragger}
                                draggable   = {true}
                                onDragStart = {(e) => MouseMove.handleStart(e, i, j, setDrag)}
                                onDrag      = {(e) => MouseMove.handleMove(e, i, j, drag)}
                            />
                            </td>
                            )}
                        </tr>)}
                </tbody>
                </table>
                <MyModal children = {user} visible={modal} setVisible={setModal}></MyModal>
            </div>
            )
            }
        
        </div>
      );
}

export default Table;