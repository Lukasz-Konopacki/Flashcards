import React from "react"
import styles from "./AddSetForm.module.css"

const AddSetForm = (props) =>{

    const close = props.close;
    const addSet = props.addSet;
    const [setName, setSetName] = React.useState("");

    return(
    <div className={styles.container}>
        <div className={styles.topBar}>
            <div className={styles.button} onClick={close}>X</div>
        </div>
        <input className={styles.input} type="text" placeholder="Set Name" value={setName} onChange={(e) => setSetName(e.target.value)}/>
        <div className={styles.downBar}>
            <div className={styles.button} onClick={ () => addSet(setName)}>Save</div>
        </div>
    </div>
    ) 
  }

  export default AddSetForm;