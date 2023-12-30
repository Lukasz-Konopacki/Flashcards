import React from "react";
import SetBanner from "./SetBanner/SetBanner";
import FlashcardList from "./FlashcardList/FlashcardList";
import AddFlashcardForm from "./AddFlashcardForm/AddFlashcardForm";
import SetName from "./SetName/SetName";
import { useParams } from 'react-router-dom';

const SetView = () =>{
  const { setId, setName } = useParams(); // id zestawu
  const [flashcards, setFlashcards] = React.useState([]); //kolekcja fiszek
  const [UpdateForm, setUpdateForm] = React.useState(false); // czy formularz edycji/ dodawania ma byc widoczny
  const [chosenFlashcard, setChosenFlashcard] = React.useState({id: null, Front: null, Back: null}); // wybrana fiszka uzywane przy edycji

  //Pobranie wartości z API
  React.useEffect(() => { 
    fetch(`http://localhost:8080/set/${setId}`,{
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
          'Access-Control-Allow-Origin': '*',
          
      }
    }) 
    .then(response => response.json())
    .then((response) => {setFlashcards(response);})
    }, [])

  //Zapisanie dodawania/edycji fiszki
  const saveFlashcard = (topValue, bottomValue) => {

    //jesli nie wybrana to jest to nowa fiszka i nalezy ja dodać
    if(chosenFlashcard.Id == null)
    {
      const newFlashcard = {
        Id: null,
        Front: topValue,
        Back: bottomValue
      }

      fetch(`http://localhost:8080/addFlashcard/${setId}`,{
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFlashcard)
      })
      .then(response => response.json())
      .then( response => newFlashcard.Id = response.Id)
      //.then( r => console.log(newFlashcard))  

      setFlashcards([...flashcards, newFlashcard]);
    }
    else{ // edycja fiszki
      chosenFlashcard.Front = topValue;
      chosenFlashcard.Back = bottomValue;

      fetch(`http://localhost:8080/editFlashcard/${chosenFlashcard.Id}`,{
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chosenFlashcard)
      })
    }

    hideAddForm();
  };

  //Usuniecie fiszki
  const removeFlashcard = (flashcardId) => {
    const confirmed = window.confirm('Are you sure you want to delete this Flashcard?');
    if (confirmed) {

        fetch(`http://localhost:8080/deleteFlashcard/${flashcardId}`,{
          method: 'DELETE',
          mode: 'cors',
          cache: 'default',
          headers: {
              'Access-Control-Allow-Origin': '*'
          }
        });
        
        setFlashcards(flashcards.filter(item => item.Id !== flashcardId));
    }
  }

  //Odpalenie widoku edycji fiszki
  const editFlashcard = (flashcardId) =>{
    setChosenFlashcard(flashcards.filter(f => { return f.Id === flashcardId})[0]);
    setUpdateForm(true);
  }

  //zamkniecie widoku edycji
  const hideAddForm = () => {
    setChosenFlashcard({id: null, Front: null, Back: null}); 
    setUpdateForm(false);
  }

    return (
        <div>
          {UpdateForm && <AddFlashcardForm close={hideAddForm} addFlashcard={saveFlashcard} flashcard={chosenFlashcard}/>}
          <SetName setId={setId} setName={setName}/>
          <SetBanner showAddForm={()=>setUpdateForm(true)}/>
          <FlashcardList flashcards={flashcards}  remove={removeFlashcard} edit={editFlashcard}/>
        </div>  
      );
}

export default SetView;