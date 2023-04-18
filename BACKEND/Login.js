const DB = require ('./DataBaseConfig')
const pass = "test"
const saltRounds = 15; 
let authorized = 0; 
  const Auth = 0; 
  async function Authoryzation(login, password) {
     const fromBase = '';
      const query = `select haslo from WORKERS where login = ${login}`;
      console.log(query)
      await DB.query(query, (err, result) => {
          if(err)
          {
            console.log("ERROR: "+ err)
          }
          else
          {
            fromBase = result; 
          }
      }); 
      console.log(fromBase); 
  }
  Authoryzation('login', 'haslo')
  module.exports = {Authoryzation, authorized }