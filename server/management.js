const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("./session");
const expressValidator = require("express-validator");
const passport = require("./passport");
const {
	createFailedManagementLog,
} = require("./route-hooks/management/error.after");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(flash());
app.use(session({
	name: "mj-platform.management",
	secret: "cZ7IOTn5uhMzoPvllA92",
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
	customSanitizers: require("ljit-validation").sanitizers,
}));

app.use(require("ljit-morgan")());

/*app.use(function mockData(req, res, next) {
	req.user = {
		id: 1,
		accountId: "5d4aea86e48b697af60c1201",
		jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJfaWQiOiI1Y2QxNTEzMTJkZmExZDI0NGRkNTQ1MTcifSwidXNlciI6eyJpZCI6MSwiYWNjb3VudElkIjoiNWQ0YWVhODZlNDhiNjk3YWY2MGMxMjAxIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpc3MiOiJsaml0LmlvIiwiaWF0IjoxNTY4MjcxMjM2LCJleHAiOjE1NjgzNTc2MzZ9.KwAUadZgWzJ6ZXReHtw_AeroUvJh-ZluPlyOZ6BSmC4",
		username: "admin",
		roleId: 1,
	};

	next();
});*/

app.use(require("ljit-device-detection/middlewares")());
app.use("/",require("./routes/management"));
app.use("/api/v1", require("./middlewares/set-request-id"), require("./routes/management-api/index.v1"));

app.get("/health", require("ljit-db/middlewares/health").pong);
app.get("/healthz", require("ljit-db/middlewares/health").ping(global.MONGO_URL));

app.use(
	require("./middlewares/error-logger"),
	createFailedManagementLog,
	require("ljit-error/middlewares")
);

module.exports = app;
