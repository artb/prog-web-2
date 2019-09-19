var http = require('http');
const fs = require('fs');



const pasta = "./" + process.argv[2] + "/";

console.log("Vendo os arquivos da pasta: " + pasta);

console.log(fs.readdir(pasta));

// fs.readdir(pasta, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });

// var server = http.createServer(function(req,res){
//     res.write("Instituto de Computação");
//     res.end();
// });

// server.listen(3000);

// const testFolder = './tests/';


