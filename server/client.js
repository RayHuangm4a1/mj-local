const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("./passport");
const session = require("./session");
const expressValidator = require("express-validator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(flash());
app.use(session({
	name: "mj-platform.client",
	secret: "FV7fppa469uYoDDICTKs",
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./middlewares/pug-extension"));
app.use(require('stylus').middleware({
	src: path.join(__dirname, '../client'),
	dest: path.join(__dirname, '../public'),
	compress: true,
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressValidator({
	customValidators: require("ljit-validation").validators,
}));
app.use(require("ljit-morgan")());
app.use("/", require("./routes/client"));

//TODO: delete temporary middleware，移除時需要跑測試
/*app.use(function mockData(req, res, next) {
	req.user = {
		id: 3,
		accountId: "5d4aea86e48b697af60c1211",
		username: "test01",
		isBetCredentialsAuthenticated: true,
	};

	next();
});*/

app.use(require("ljit-device-detection/middlewares")());
app.use("/api/v1", require("./middlewares/set-request-id"), require("./routes/client-api/index.v1"));

app.get("/health", require("ljit-db/middlewares/health").pong);
app.get("/healthz", require("ljit-db/middlewares/health").ping(global.MONGO_URL));

app.use(require("./middlewares/error-logger"), require("ljit-error/middlewares"));

module.exports = app;
