const mysql = require('mysql');


const con = mysql.createConnection({
    host: MYSQL_ADDON_HOST,
    user: MYSQL_ADDON_USER,
    password: MYSQL_ADDON_PASSWORD,
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});