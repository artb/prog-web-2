const express = require('express');
const logger = require('morgan');
const sass = require('node-sass-middleware');
const router = require('./config/router');
const csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
const cookieParser = require('cookie-parser');
const uuid = require("uuid/v4");
const session = require("express-session");

const app = express();
const http = require("http").createServer(app);
const handlebars = require('express-handlebars');
const io = require("socket.io")(http);

const nsPartida = io.of("/partida");

nsPartida.on("connection", client => {
	console.log("novo jogador na partida");
	client.on("jogada", json => {
		console.log(json);
		client.broadcast.emit("jogada", json);
	});
});

io.on("connection", client => { });

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(csrfProtection);

// const PORT = process.env.PORT || 300

app.get('/uuid', function (req, res) {
	const uniqueId = uuid()
	res.send(`UUID: ${uniqueId}`)
})

// setup route middlewares



io.on('connect', (client) => {

	console.log("usuario conectado");
	const uid = client.id.substr(0, 4);
	var sala = 1;
	client.join(sala);

	client.on('oi', (oi) => {
		console.log(oi);
		client.emit('oi', 'Você disse: ' + oi);
		client.to(sala).broadcast.emit('oi', 'O usuário ' + uid + ' disse: ' + oi);
	});

	client.on('mudarSala', (s) => {
		sala = s;
		client.leaveAll();
		client.join(sala);
	});
});


// const port = process.env.PORTCHESS || 4444


app.use(
	session({
		genid: req => {
			return uuid();
		},
		secret: "bindazao",
		resave: false,
		saveUninitialized: true
	})
);


app.get('/apaga_cookie', function (req, res) {
	res.clearCookie('nome');
	res.send('cookie apagado');
});

// SCSS import

app.use(sass({
	src: __dirname + '/public/scss',
	dest: __dirname + '/public/css',
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views')

//bootstrap import
app.use('/js', [
	express.static(__dirname + '/node_modules/jquery/dist/'),
	express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
	express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
	express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
	express.static(__dirname + '/node_modules/chess.js/'),
	express.static(__dirname + '/public/js')
]);
// css import
app.use('/css', [
	express.static(__dirname + '/public/css'),
	express.static(__dirname + '/node_modules/bootstrap/dist/css/'),
	express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),

]);


app.engine('handlebars', handlebars({
	layoutsDir: __dirname + '/app/views/layouts',
	defaultLayout: 'main.handlebars',
}));


app.use(logger("short"));


app.use('/assets', [
	express.static(__dirname + '/assets')
]);

app.use('/img', [
	express.static(__dirname + '/public/img'),
]);

app.use(router);


http.listen(4567, function () {
	console.log("App ouvindo a porta" + 4567);
});