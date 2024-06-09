import * as mysql from "mysql2";
// Connection to mysql database
const connection = mysql.createConnection({
    host: "localhost", // Computer
    user: "root", // Username
    password: "tuko@2016", // Password
    database: "blobstoredb" // Database name
});

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log("Failed to create connection + " + err);
        return;
    }
    console.log("We're connected to MySQL");
});


// One function for executing select / insert / update / delete: 
export function execute(sql:string) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                // console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export function executeWithParameters(sql: string, parameters: Array<String>) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}