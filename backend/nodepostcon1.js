// const { Client } = require('pg')
// const client = new Client()
// ;(async () => {
//   await client.connect()
//   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//   console.log(res.rows[0].message) // Hello world!
//   await client.end()
// })()

const {Pool,Client} = require('pg')
const connectionString = 'postgressql://postgres:demo1234@localhost:5432/yatharthgupta'

const client = new Client({
  connectionString:connectionString
})

 client.connect()
// //getUsers(
// client.query('SELECT * from users',(err,res)=>{
//   console.log(res.rows)
//   client.end()
// })

module.exports = client;