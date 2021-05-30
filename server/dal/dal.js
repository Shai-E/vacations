require("dotenv").config();
const mysql = require("mysql2");

const db = process.env.SQL_DB;

const options = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PWD,
    database: db
}

const connection = mysql.createConnection(options);

connection.connect(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`We're connected to ${db} on MySQL`);
});

const execute = (sql) => {
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const executeWithParams = (sql, parameters) => {
    return new Promise((resolve, reject)=>{
        connection.execute(sql, parameters, (err, result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParams
};