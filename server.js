const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const multer = require("multer");
const path = require("path");

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ url: "/uploads/" + req.file.filename });
});

io.on("connection", (socket) => {
  console.log("Yeni kullanıcı bağlandı");
  socket.on("chat message", (msg) => io.emit("chat message", msg));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
