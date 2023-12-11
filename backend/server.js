const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");



//app.use
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

//misc
const {requestTime} = require("./middleware/request-time");
const createError = require("http-errors");

//port
const PORT = process.env.PORT || 3000;

//live reload
/*
if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
  
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");
  
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, "static"));
    liveReloadServer.server.once("connection", () => {
      setTimeout(() => {
        liveReloadServer.refresh(`/`);
      }, 100);
    });
    app.use(connectLiveReload());
}
*/

//routes
const Routes = require("./routes");
app.use("/",Routes.root);
app.use("/login",Routes.login);
app.use("/signUp",Routes.signUp);
app.use("/game",Routes.game);
app.use("/lobby",Routes.lobby);
app.use(express.static(path.join(__dirname,"static")));


//request time
app.use(requestTime);

//404 error handling
app.use((_request,_response, next) => {
    next(createError(404));
});

//console log to test
app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});