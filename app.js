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

con.end();
function add (){
    let dados = { name: 'Winnie', password: 'Australia' };
    con.query('INSERT INTO DBserver SET ?', dados, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
}