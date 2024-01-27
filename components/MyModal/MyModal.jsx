import React, { useMemo } from 'react';
import cl from "./MyModal.module.css"
const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    if (visible){
        rootClasses.push(cl.active);
    } 
    const keys = ["firstname", "lastname", "maidenname", 
    "age", "city", "address", "height", "weight", "email", "phone"]

    const arr = children.map(i=>{
        return [i.firstName, i.lastName,i.maidenName,
                i.age, i.address.city, 
                i.address.address, i.height, i.weight,
                i.email, i.phone];
       
    })
    return (
        <div className={rootClasses.join(" ")} onClick={()=>setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e)=>e.stopPropagation()}>
            {arr.map((row, i) => 
                <tr key={arr[i][0]} 
                    id = {arr[i][0]} 
                    className="modal_arr"> 
                        {row.map((col, j) => 
                            <td  key = {j} id = {`${i}${j}`}>
                                {keys[j]} : {" " + arr[i][j]} 
                                <div className='divide'></div>
                            </td>)}
                </tr>)}
            </div>
        </div>
    );
}

export default MyModal;