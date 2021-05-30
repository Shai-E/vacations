const mysql = require("mysql2");

const db = 'vacations';

const options = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: db
}

const connection = mysql.createConnection(options);

connection.connect(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("We're connected to "+db+" on MySQL");
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