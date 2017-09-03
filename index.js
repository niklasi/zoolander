const restify = require('restify')

const server = restify.createServer({
  name: 'Battle-Snake',
});

server.use(restify.bodyParser())

server.post('/start', function create(req, res, next) {
  const { game_id, width, height } = req.body
  console.log('Starting game...', game_id)
  res.json(200, {
    color: '#FF0000',
    secondary_color: '#00FF00',
    head_url: 'http://placecage.com/c/100/100',
    name: 'Zoolander',
    taunt: 'Blue steel',
    head_type: 'pixel',
    tail_type: 'pixel'
  })

  return next();
})

server.post('/move', function create(req, res, next) {
  const { food, snakes, width, height } = req.body 

  const foodX = food[0][0]
  const foodY = food[0][1]
  
  const mySnake = snakes[0].coords
  const myHeadX = mySnake[0][0]
  const myHeadY = mySnake[0][1]
  const myNeckX = mySnake[1][0]
  const myNeckY = mySnake[1][1]
  
  let currentDirection = ''
  let move = ''
  if (myHeadX === myNeckX) {
    currentDirection = myHeadY > myNeckY ? 'down' : 'up' 
  } else {
    currentDirection = myHeadX > myNeckX ? 'right' : 'left' 
  }

  switch (currentDirection) {
    case 'down':
      move = foodY > myHeadY ? 'down': 'left' 
      break
    case 'up':
      move = foodY < myHeadY ? 'up': 'right'
      break
    case 'right':
      move = myHeadX == width - 1 ? 'down': 'right'
      break
    case 'left':
      move = myHeadX == 0 ? 'up': 'left'
      break
  }
  
  console.log('Current direction', currentDirection)
  res.json(200, { move })
  return next();
})

server.listen(8080);
