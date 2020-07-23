const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const pgdb = require('./nodepostcon1')
const cors = require('cors');
// use it before all route definitions
app.use(cors({origin: '*'}));
// const {Pool,Client} = require('pg')
// const connectionString = 'postgressql://yatharth@localhost';

// const client = new Client({
//     connectionString:connectionString
//   })
app.use(bodyParser.json());
//client.connect();

const port = 3001;

// app.get('/hello/hi', function(req, res, next){
//     console.log("hello");
//     console.group("request : ", req.params);
//     res.send("hello world");
// })

app.get('/api/users', function(req, res, next){
    console.log("users");
    pgdb.query('SELECT * from users',(err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
    //  client.end()
    //console.group("request : ", req.params);
    //res.send("hello world");
})
})

app.get('/api/users/:id', function(req, res, next){
    console.log("users with id");
    console.log(req.params.id);
    pgdb.query('SELECT * from users where id = '+ req.params.id, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows[0])
        //res.send(JSON.stringify(data));
    //  client.end()
    //console.group("request : ", req.params);
    //res.send("hello world");
})
})

app.get('/api/userinterests', function(req, res, next){
    console.log("userinterests");
    pgdb.query('SELECT * from userinterests',(err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
    })
})

app.get('/api/userinterests/:id', function(req, res, next){
    console.log("userinterests with id");
    console.log(req.params.id);
    pgdb.query('SELECT * from userinterests where id = '+ req.params.id, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows[0])
})
})
// ---------------- POST ---------------------------
// ---------------- POST ---------------------------
// ---------------- POST ---------------------------

app.post('/api/interests',(req, res) =>{
//    const data = {id: req.body.id, type: req.body.type, description: req.body.description, subtype: req.body.subtype};
    const sql = "INSERT INTO interests (type, description, subtype) VALUES ('"+ req.body.type + "' , '" +req.body.description + "' , '" +req.body.subtype +"')";
    console.log(sql)
    pgdb.query(sql, (err, results) => {
      if(err) {
        res.send("error: ",err);
    };
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

app.post('/api/cities',(req, res) =>{
//    const data = {id: req.body.id, type: req.body.type, description: req.body.description, subtype: req.body.subtype};
    const sql = "INSERT INTO cities (cityname, state) VALUES ('"+ req.body.cityname + "' , '" +req.body.state + "')";
    console.log(sql)
    pgdb.query(sql, (err, results) => {
        if(err) {
        res.send("error: ",err);
    };
        res.send({"response": results});
    });
});

  app.post('/api/users',function(req, res) {
    //const data = {id: req.body.id, fullname: req.body.fullname, emailid: req.body.emailid, contactnumber: req.body.contactnumber, age: req.body.age, gender: req.body.gender, location: req.body.location, cityid: req.body.cityid};
    //const sql = "INSERT INTO users SET ?";
    const sql = "INSERT INTO users(fullname, emailid, contactnumber, age, gender, location, cityid) VALUES ('"  + req.body.fullname + "' , '" + req.body.emailid + "' , '" + req.body.contactnumber + "' , " + req.body.age + " , '" + req.body.gender + "' , '" + req.body.location + "' , " + req.body.cityid + ")";
    console.log(sql);
    pgdb.query(sql, (err, results) => {
    //    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

app.post('/api/events',function(req, res) {
    //const data = {id: req.body.id, fullname: req.body.fullname, emailid: req.body.emailid, contactnumber: req.body.contactnumber, age: req.body.age, gender: req.body.gender, location: req.body.location, cityid: req.body.cityid};
    //const sql = "INSERT INTO users SET ?";
    const sql = "INSERT INTO events(eventname, cityid, starttime, endtime, ticketprice, ishappening, description, interestid) VALUES ('" + req.body.eventname+ "' , " + req.body.cityid + " , '" + req.body.starttime + "' , '" + req.body.endtime + "' , " + req.body.ticketprice + " , " + req.body.ishappening + " , '" + req.body.description +"' , "+ req.body.interestid + ")";
    console.log(sql);
    pgdb.query(sql, (err, results) => {
    //    if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// ---------------- POST END---------------------------
// ---------------- POST END---------------------------
// ---------------- POST END---------------------------

//   //update product
//   app.put('/api/products/:id',(req, res) => {
//     let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });
app.put('/api/cities/:id',(req, res) => {
    const sql = "UPDATE cities SET cityname='"+req.body.cityname+"', state='"+req.body.state+"' WHERE id="+req.params.id;
    console.log(sql);
    pgdb.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});
//   //Delete product
//   app.delete('/api/products/:id',(req, res) => {
//     let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });

app.get('/api/cities', function(req, res, next){
    console.log("cities");
    pgdb.query('SELECT * from cities',(err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
})
})

app.get('/api/cities/:id', function(req, res, next){
    console.log("cities with id");
    console.log(req.params.id);
    pgdb.query('SELECT * from cities where id = '+ req.params.id, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows[0])
})
})

app.get('/api/events', function(req, res, next){
    console.log("events");
    pgdb.query('SELECT * from events',(err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
})
})

app.get('/api/events/:id', function(req, res, next){
    console.log("events with id");
    console.log(req.params.id);
    pgdb.query('SELECT * from events where id = '+ req.params.id, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows[0])
})
})


app.get('/api/interests', function(req, res, next){
    console.log("interests");
    pgdb.query('SELECT * from interests',(err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
})
})

app.post('/api/userinterests/:id',function(req, res) {
    const sql1 = "INSERT INTO userinterests (userid, interestid) values (" +req.params.id+", (select id FROM interests WHERE type = '"+req.body.type+"' and subtype ='"+req.body.subtype+"'))"
    console.log(sql1);
    pgdb.query(sql1, (err, results) => {
        if(err) {
            res.send("error: ",err);
        };
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/api/cityinterests',function(req, res) {
    const sql1 ="select * from events where cityid = (SELECT id from cities where cityname = '"+req.query.cityname+"') and interestid = (SELECT id from interests where type = '"+req.query.interest+"')"
    console.log("1234"+req.query.cityname + "   " + req.query.interest);
    console.log(sql1);
    pgdb.query(sql1, (err, results) => {
        if(err) {
            res.send("error: ",err);
        };
        console.log(results.rows);
        res.send(results.rows);
    });
});

app.get('/api/interests/:id', function(req, res, next){
    console.log("interests with id");
    console.log(req.params.id);
    pgdb.query('SELECT * from interests where id = '+ req.params.id, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows[0])
})
})

app.get('/api/userevents/:id', function(req, res, next){
    console.log("user registered events");
    const sql1 ="select * from events where id IN ( select eventid from userevents where userid = "+req.params.id+")"
    console.log(req.params.id);
    console.log(sql1)
    pgdb.query(sql1, (err,data)=>{
        if(err) {
            res.send("error: ",err);
        }
        console.log(data.rows);
        res.send(data.rows)
})
})

//REgister for aan event

app.post('/api/registerevent',function(req, res) {
    console.log("entered beackend");
    const sql1 = "insert into userevents (userid, eventid) values(4 , "+req.query.eids+")"
    console.log(sql1);
    pgdb.query(sql1, (err, results) => {
        if(err) {
            res.send("error: ",err);
        };
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});



app.listen(port, ()=>{
    console.log('server is up and running on port'+ port);
})



//----------TEST PART-----------------
//----------TEST PART-----------------
//----------TEST PART-----------------

