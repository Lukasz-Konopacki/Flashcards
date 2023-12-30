import React from "react";
import styles from "./Menu.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faCircleInfo, faPhone, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Menu = (props) =>{
      return (
        <div className={styles.menu}>
            <div className={styles.logo}>
                <h2>App Name </h2>
            </div>

            <div className={styles.item}>
                <div className={styles.name}>
                    <FontAwesomeIcon icon={faLayerGroup} className={styles.icon}/>
                    <h3><Link to="/">Flashcards</Link></h3>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.name}>
                    <FontAwesomeIcon icon={faCircleInfo} className={styles.icon}/>
                    <h3><Link to="about">About</Link></h3>
                </div>
                
            </div>

            <div className={styles.item}>
                <div className={styles.name}>
                    <FontAwesomeIcon icon={faPhone} className={styles.icon}/>
                    <h3><Link to="contact">Contact</Link></h3>
                </div> 
            </div>

            <div className={styles.item}>
                <div className={styles.name}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.icon}/>
                    <h3><a href="LogIn.html">LogOut</a></h3>
                </div>               
            </div>
        </div>
      );
    } 
  export default Menu;