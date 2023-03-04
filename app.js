const express = require('express')
const port = 80

const app = express();

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/html/login_screen.html')
});
app.use(express.static(__dirname + '/public'));

app.listen(port); 