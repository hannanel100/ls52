const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const atob = require('atob');
const endPoint = '/auth';
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());


app.get(endPoint, (req, res) => res.send('Hello World!'))
app.post(endPoint, function (req, res) {
    const {user, pass} = splitCredintials(req.headers.authorization);
    if(!user){
        res.status(401).send();
    }
    else{
        console.log(user, pass);
        res.send();
    }
  res.send('POST request to the homepage')
})
const splitCredintials = (str) => {
    const authHeader = str.split(' ');
    if (authHeader[0] === 'basic'){
        return {
            user: atob(authHeader[1]).split(':')[0],
            pass: atob(authHeader[1]).split(':')[1]
        }
    } 
}
app.listen(port, () => console.log(`Example app listening on port port!`))

