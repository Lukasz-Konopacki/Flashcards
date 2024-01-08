const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise')
const dbconfig = require('../configuration/dbconfig');

const saltRound = 10;

const pool = mysql.createPool(dbconfig.database);

const Register = async (req, res, next) => {

    const user = req.body;

    const validation = await validateData(user);

    if(!validation.isEmailValid || !validation.isLoginValid){
        res.status(200).json({error: "Data are not valid", isEmailValid: validation.isEmailValid, isLoginValid: validation.isLoginValid});
    }
    else{
        bcrypt.hash(user.password, saltRound, async (err, hash) =>{
            pool.query(`
            insert into users(Login, Email, Password)
            values(?, ?, ?);`,
            [user.login, user.email, hash],
            (err, result) => {
                if(err){
                    console.log(err);
                }
            });

            res.status(200).json({ message: 'Success' });
        })
    } 
};

const validateData = async (user) =>{
    let isEmailValid = true
    let isLoginValid = true

    if(!user.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        isEmailValid = false
    }

    const connection = await pool.getConnection();
    var result = await connection.query(`select 1 from users where login =?`, [user.login]);
    if (result[0].length > 0) {
        isLoginValid = false;
    }

        return { isEmailValid: isEmailValid, isLoginValid: isLoginValid}
}

const Login = async (req, res, next) => {

    const user = req.body;
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(`select * from users where login = ?`,[user.login]);
        if(result[0].length > 0){
            console.log(result[0].Password)
            bcrypt.compare(user.password, result[0][0].Password, (error, response) => {
                if(response){

                    const userId = result[0][0].Id
                    const token = jwt.sign({userId}, "jwtSecret", {
                        expiresIn: 300,
                    })

                    res.json({auth: true, token: token, result: result[0]});
                }
                else{
                    res.send({message : "Wrong username/password combination!"});
                }
            });
        }
        else{
            res.send({message : "User doesn't exists!"});
        }

    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    Register,
    Login
};