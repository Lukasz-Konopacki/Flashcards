import React from "react"
import styles from "./AddFlashcardForm.module.css"
import Axios from "axios"

const AddFlashcardForm = (props) =>{

    const closeForm = props.close;
    const addFlashcard = props.addFlashcard;
    const flashcard = props.flashcard;

    const [topValue, setTopValue] = React.useState(flashcard.Front ?? "");
    const [bottomValue, setBottomValue] = React.useState(flashcard.Back ?? "");
    const [errorMessage, setErrorMessage] = React.useState("");
    
    const save = () =>{
        if(topValue.length < 3 || bottomValue.length < 3)
            setErrorMessage("Błąd: Jedno z pól ma mniej niż 3 znaki");
        else
            addFlashcard(topValue, bottomValue);
    }

    const checkHandle = async () =>{
        let key = "12b1e7d80be64f0a87b3337c663c1a60";
        let endpoint = "https://api.cognitive.microsofttranslator.com";
        let location = "westeurope";
        let response;

        //Check top flashcard language
        let topLanguage;
        await Axios({
                baseURL: endpoint,
                url: '/detect',
                method: 'post',
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                    'Ocp-Apim-Subscription-Region': location,
                    'Content-type': 'application/json',
                },
                params: {
                    'api-version': '3.0',
                },
                data: [{
                    'text': topValue
                }],
                responseType: 'json'
            }).then(function(response){
                topLanguage = response.data[0].language;
                console.log(topLanguage);
            })


        //Check bottom flashcard language
        let bottomLanguage;
        await Axios({
                baseURL: endpoint,
                url: '/detect',
                method: 'post',
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                    'Ocp-Apim-Subscription-Region': location,
                    'Content-type': 'application/json',
                },
                params: {
                    'api-version': '3.0',
                },
                data: [{
                    'text': bottomValue
                }],
                responseType: 'json'
            }).then(function(response){
                bottomLanguage = response.data[0].language;
                console.log(bottomLanguage);
            })

        //Translate top flashcard text
        let topTranslation;
        await Axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
            },
            params: {
                'api-version': '3.0',
                'from': topLanguage,
                'to': bottomLanguage 
            },
            data: [{
                'text': topValue
            }],
            responseType: 'json'
        }).then(function(response){
            topTranslation = response.data[0].translations[0].text
            console.log(topTranslation);
        })

        //Translate bottom flashcard text
        let bottomTranslation;
        await Axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
            },
            params: {
                'api-version': '3.0',
                'from': bottomLanguage,
                'to': topLanguage
            },
            data: [{
                'text': bottomValue
            }],
            responseType: 'json'
        }).then(function(response){
            bottomTranslation = response.data[0].translations[0].text
            console.log(bottomTranslation);
        })

        if(bottomValue == "" || topValue == ""){
            setErrorMessage(`Assign both values`);
        }
        else if(topValue !== bottomTranslation || bottomValue !== topTranslation){
            setErrorMessage(`The top value is: ${topValue} but translation suggest: ${topTranslation}\n` +
                `The bottom value is: ${bottomValue} but translation suggest: ${bottomTranslation}`);
        }
        else if(topValue !== bottomTranslation){
            setErrorMessage(`The top value is: ${topValue} but translation suggest: ${topTranslation}\n`);
        }
        else if(bottomValue !== topTranslation){
            setErrorMessage(`The bottom value is: ${bottomValue} but translation suggest: ${bottomTranslation}\n`);
        }
        else{
            setErrorMessage(`Correct!`);
            errorClass = styles.correct;
        }
    }

    return(
    <div className={styles.container}>
        <div className={styles.topBar}>
            <div className={styles.button} onClick={closeForm}>X</div>
        </div>
        <input id="flashcard-front" className={styles.input} type="text" placeholder="Front" value={topValue} onChange={(e) => setTopValue(e.target.value)}/>
        <hr/>
        <input id="flashcard-back" className={styles.input} type="text" placeholder="Back" value={bottomValue} onChange={(e) => setBottomValue(e.target.value)}/>
        <p className={errorMessage === 'Correct!' ? styles.correct : styles.error}>{errorMessage}</p>
        <div className={styles.downBar}>
            <div id="save-flashcard" className={styles.button} onClick={save}>Save</div>
            <div id="check-flashcard" className={styles.button} onClick={checkHandle}>Check</div>
        </div>
    </div>
    ) 
  }

  export default AddFlashcardForm;