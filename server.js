const express = require('express');
const app = express();


app.use(express.static('dist'));

app.get('/api', function(req, res){
    res.send("/api");
})

app.listen(8080, function(){
    console.log('App listening on port 8080');
})