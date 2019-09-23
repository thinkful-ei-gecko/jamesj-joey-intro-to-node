const express = require('express');
const morgan = require('morgan');
//create express app
const app = express();
//establish logging in your local server
app.use(morgan('common'));
//endpoints
app.get('/sum', (req, res) => {
  if (!req.query.a || !req.query.b) {
    return res.status(400).send('must include parameters');
  }
  //   else if((typeof req.query.a !== 'number') ||(typeof req.query.b !== 'number')){
  //     return res.status(400).send('must include numbers');
  //   }
  return res.send(
    `The sum of ${req.query.a} and ${req.query.b} is ${parseInt(
      req.query.a,
      10
    ) + parseInt(req.query.b, 10)}`
  );
});

app.get('/cipher', (req, res) => {
  if (!req.query.text || !req.query.shift) {
    return res.status(400).send('must include parameters');
  }
  let encodedString = '';
  for (let i = 0; i < req.query.text.length; i++) {
    if (req.query.text.charCodeAt(i) + parseInt(req.query.shift, 10) > 90) {
      encodedString += String.fromCharCode(
        req.query.text.charCodeAt(i) + parseInt(req.query.shift, 10) - 26
      );
    } else {
      encodedString += String.fromCharCode(
        req.query.text.charCodeAt(i) + parseInt(req.query.shift, 10)
      );
    }
  }
  return res.send(encodedString);
});

app.get('/lotto', (req, res) => {
  if (!req.query.numbers) {
    return res.status(400).send('must include parameters');
  } else if (req.query.numbers.length !== 6) {
    return res.status(400).send('must include 6 numbers');
  }

  //The maximum is inclusive and the minimum is inclusive
  let winningNumbersArray = [];

  function generateWinningNumbers() {
    let min = 1;
    let max = 20;
    let i = 0;
    
    while (i < 6) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!winningNumbersArray.includes(num)) {
        winningNumbersArray.push(num);
        i++;
      }  
    }
    return winningNumbersArray;

  }

  const winningPlay = generateWinningNumbers();
  const lottoTicket = req.query.numbers.map(num => parseInt(num));

  function determinePrize(winningPlay, lottoTicket) {
    let correctTally = 0;
    lottoTicket.forEach(num => {
      if(winningPlay.includes(num)) {
        correctTally++;
      }
    });
    if(correctTally < 4) {
      res.send('Sorry bro no dice');
    } else if (correctTally === 4) {
      res.send('You win a free ticket!');
    } else if (correctTally === 5) {
      res.send('You win $100!!');
    } else if (correctTally === 6) {
      res.send('You win the lotto! Can I borrow some money please...');
    }
  }
  determinePrize(winningPlay, lottoTicket);
});

app.listen(8000, () => console.log('running on port 8000'));
