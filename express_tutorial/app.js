const express = require('express');
const logger = require('morgan');
const router = require('./config/router');
const handlebars = require('express-handlebars');
const uuid = require("uuid/v4");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const PORT = process.env.PORT || 300

// setup route middlewares
var csrfProtection = csrf({ cookie: true });
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cookieParser());
app.use(csrfProtection);
app.use(
	session({
		genid: req => {
			return uuid();
		},
		secret: "#bindazinho",
		resave: false,
		saveUninitialized: true
	})
);


app.get('/apaga_cookie', function (req, res) {
	res.clearCookie('nome');
	res.send('cookie apagado');
});

io.on("connection", client => { });
// SCSS import
const sass = require('node-sass-middleware');
app.use(sass({
	src: __dirname + '/public/scss',
	dest: __dirname + '/public/css',
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));
//bootstrap import
app.use('/js', [
	express.static(__dirname + '/node_modules/jquery/dist/'),
	express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
	express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
	express.static(__dirname + '/public/js')
]);
// css import
app.use('/css', [
	express.static(__dirname + '/public/css')
]);




app.engine('handlebars', handlebars({
	layoutsDir: __dirname + '/app/views/layouts',
	defaultLayout: 'main.handlebars',
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views')

app.use(logger("common"));
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use('/assets', [
	express.static(__dirname + '/assets')
]);



app.listen(3000, function () {
	console.log("Express running on port 3000");
});

http.listen(PORT, function () {
	console.log("Ouvindo a porta " + PORT)
});