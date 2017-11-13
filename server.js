const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) =>
  res.sendFile(__dirname + 'index.html'))
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/assets'));

http.listen(4000);
console.log('server is running at port 4000');
