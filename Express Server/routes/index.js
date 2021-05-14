var getEditDistance = require('damlev').default;
var { readFileSync } = require('fs');

var express = require('express');
var router = express.Router();
const words = readFileSync('english-words.txt', 'utf-8').split('\n');


const database = [
  {
    "name": "Sana",
    "zodiac": "libra"
  },
  {
    "name": "Rachel",
    "zodiac": "virgo"
  },
  {
    "name": "Alessandro",
    "zodiac": "gemini"
  }
]

/* GET home page. */
router.get('/', (req, res, next) => {  
  res.render('index', { title: 'Express' });
});

router.get('/api', (req, res, next) => {
  res.send(['users', 'images', 'videos']);
})

router.get('/users', (req, res, next) => {
  res.send(database.map(user => {return user.name}));
})

router.get('/zodiac', (req, res, next) => {  
  res.send(database.map(user => {return user.zodiac}));
})

router.post('/message', (req, res, next) => {
  res.send(`You sent me a message! It looks like this: ${JSON.stringify(req.body)}`)
})

router.get('/:word', (req, res, next) => {  
  res.send(slowSpellCheck(req.params.word));
})

module.exports = router;

function slowSpellCheck(input) {
  let bestWord = '';
  let bestScore = input.length;
  for (const word of words) {
    const score = getEditDistance(input, word);
    if (score < bestScore) {
      bestWord = word;
      bestScore = score;
    }
  }
  return bestWord;
}
