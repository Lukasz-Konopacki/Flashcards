import React from "react";
import styles from "./SetsList.module.css"
import { Link } from "react-router-dom";
import AddSetForm from "./AddSetForm/AddSetForm";
import SetName from "../SetView/SetName/SetName";


const SetsList = () =>{
    const [sets, setSets] = React.useState([]);
    const [UpdateForm, setUpdateForm] = React.useState(false); // czy formularz edycji/ dodawania ma byc widoczny

    
    React.useEffect(() => {
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
        fetch('http://localhost:8080/sets',options)
            .then(response => response.json())
            .then((response) => {
                const setsWithKey = response.map((obj, index) => ({
                  ...obj,
                  key: index + 1,
                }));
                setSets(setsWithKey);
                //console.log(setsWithKey);
            })
    }, [])

    const deleteSet = (setId) => {
        const confirmed = window.confirm('Are you sure you want to delete this set?');
        if (confirmed) {

            const options = {
                method: 'DELETE',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
            fetch(`http://localhost:8080/deleteSet/${setId}`,options)
            
            setSets(sets.filter(el => el.id !== setId));
        }
    };

    const addSet = (setName) =>{
        const newSet = {
            id: null,
            name: setName,
            cardNumber: 0,
            key: Math.max(...sets.map(obj => obj.key)) + 1
          }
    
        fetch(`http://localhost:8080/addSet/${setName}`,{
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        })
        .then(response => response.json())
        .then( response => newSet.id = response.Id)
        .then(response => setSets([...sets, newSet]))
        .then( response => console.log(sets))  

          hideAddForm();
    }

    const hideAddForm = () => {
        setUpdateForm(false);
      }

    return(
        <div className={styles.setsList}>
            {UpdateForm && <AddSetForm addSet={addSet} close={hideAddForm}/>}

            <div className={styles.title}>
                <h1>Flashcards sets</h1>
                <div onClick={() => setUpdateForm(true)}><Link>Add +</Link></div>  
            </div>

            { <table id="sets-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>number of cards</th>
                        <th>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {sets.map(el => (
                    <tr key={el.key}>
                        <td>{el.key}</td>
                        <td>{el.name}</td>
                        <td>{el.cardNumber}</td>
                        <td className={styles.buttons}>
                            <div className={styles.button} ><Link>Play</Link></div>
                            <div className={styles.button} ><Link to={`/set/${el.id}/${el.name}`}>Edit</Link></div>
                            <div className={styles.button} onClick={() => deleteSet(el.id)}><Link>Delete</Link></div>    
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    );
}

export default SetsList;