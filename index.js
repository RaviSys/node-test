var http = require('http');
var fs = require('fs');
http.createServer(function(request, response){

  fs.readFile('templates/index.html', function(error, pageResponse){
    if(error) {
      response.writeHead(404);
      response.write('Not Found');
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(pageResponse);
    }
    response.end();
  });

}).listen(8080);

console.log("Server started listining on 8080");
