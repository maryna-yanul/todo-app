const express = require('express');
const path = require('path');
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS());
app.use(express.static('./dist/todoApp'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/todoApp/index.html'));
});

app.listen(process.env.PORT || 8080);