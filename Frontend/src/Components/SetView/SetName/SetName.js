import React from "react";
import styles from "./SetName.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const SetName = (props) => {

    const [isEditing, setIsEditing] = React.useState(false);
    const [setName, setSetName] = React.useState(props.setName);
    const setId = props.setId;

    const editName = () =>{
        setIsEditing(true);
    }

    const handleBlur = () =>{
        setIsEditing(false);

        const set = {
            name: setName,
            id: setId
        }

        fetch(`http://localhost:8080/editSet/${setId}`,{
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(set)
      })
    }

    const handlInputChange = (e) =>{
        setSetName(e.target.value);
    }

    return(
        <div className={styles.name}>
                
                {(isEditing ?
                <input type="text" onBlur={handleBlur} onChange={handlInputChange} value={setName}></input> :
                <h2>{setName}</h2>)}
                <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={editName}/>
        </div>
    );
}

export default SetName;