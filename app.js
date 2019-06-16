
const mysql = require('mysql');







function add (){
    var con = mysql.createConnection({
        host     : 'bbn132dzvwd6bohqxzzt-mysql.services.clever-cloud.com',
        database : 'bbn132dzvwd6bohqxzzt',
        user     : 'un4hr46hmgxbvykk',
        password : 'lnFvMUNwAQuDFJk5SMiQ'
    });
    con.connect((err) => {
        if(err){
          console.log('Error connecting to Db');
          return;
        }
        console.log('Connection established');
      });
    
    let dados = { name: 'Winnie', password: 'Australia' };
    con.query('INSERT INTO DBserver SET ?', dados, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
  con.end();
});
}