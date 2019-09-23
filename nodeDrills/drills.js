const express = require('express');
const morgan = require('morgan');
//create express app
const app = express();
//establish logging in your local server
app.use( morgan('common'));
//endpoints
app.get('/sum', (req, res)=>{
  if ( !req.query.a || !req.query.b){
    return res.status(400).send('must include parameters');
  }
  //   else if((typeof req.query.a !== 'number') ||(typeof req.query.b !== 'number')){
  //     return res.status(400).send('must include numbers');
  //   }
  return res.send(`The sum of ${req.query.a} and ${req.query.b} is ${parseInt(req.query.a, 10) + parseInt(req.query.b, 10)}`);
});

app.get('/cipher', (req, res)=> {
  if ( !req.query.text || !req.query.shift){
    return res.status(400).send('must include parameters');
  }
  let encodedString ='';
  for( let i = 0; i < req.query.text.length; i++){
    if (req.query.text.charCodeAt(i) +  parseInt(req.query.shift, 10) > 90){
      encodedString += String.fromCharCode(req.query.text.charCodeAt(i) + parseInt(req.query.shift, 10) - 26);
    }
    else{
      encodedString += String.fromCharCode(req.query.text.charCodeAt(i) + parseInt(req.query.shift, 10));
    }
  } 
  return res.send( encodedString);

});




app.listen(8000, ()=>console.log('running on port 8000'));
