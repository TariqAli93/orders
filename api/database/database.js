const mysql = require('mysql')
let dbPass = '';
if(process.env.NODE_ENV === 'production') {
    dbPass = '11q22q33q'
}
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPass,
    database: 'nuktastore',
    port: 3306
})

connection.connect(err => {
    if(!err)
        console.log('database connected successfully')
    else
        console.error(JSON.stringify(err))
})

module.exports = connection