const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const cors = require("cors");
const verifyToken = require("./middlewares/vt");
const vacationsController = require("./controllers/vacationsController");
const usersController = require("./controllers/usersController");

app.use(cookieParser());
app.use(
    cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true })
);
app.use(express.json());
app.use(express.static(__dirname));
app.use(fileUpload());

app.use("/api/vacations", verifyToken, vacationsController);
app.use("/api/users", cookieParser(), usersController);

app.use((err, _req, res, _next)=>{
    return res.status(err.code || 500).json({message: err.message || "Unknown Error."})
})

// socket.io setup

const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", function (socket) {
    socket.on("data-client-changes", function (userId, data) {
        io.emit("data-remote-changes", userId, data);
    });
});

server.listen(port, function () {
    console.log("Listening on " + port);
});
