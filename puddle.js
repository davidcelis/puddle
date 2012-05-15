var net = require('net');
var players = [];

// Callback for a new player connection.
function newConnection(player) {
  players.push(player);
  player.write('Welcome to Puddle!\n');
  player.write('>> ');

  player.on('data', function(data) {
    receiveData(player, data);
  });

  player.on('end', function() {
    disconnectPlayer(player);
  });
}

function receiveData(player, data) {
  if (data.toString().replace(/(\r\n|\n|\r)/gm,'') == 'exit') {
    player.end();
  } else {
    player.write('You said: ' + data);
    player.write('>> ');
  }
}

function disconnectPlayer(player) {
  var i = players.indexOf(player);
  players.splice(i, 1);
}

var server = net.createServer(newConnection);

server.listen(8888);
