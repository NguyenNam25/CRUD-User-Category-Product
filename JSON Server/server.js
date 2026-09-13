const jsonServer = require("json-server");
const auth = require("json-server-auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const { JWT_SECRET_KEY } = require("json-server-auth/dist/constants");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);

app.put("/users/:id", (req, res, next) => {
  // Nếu client CÓ gửi password (form đổi mật khẩu riêng) -> để auth xử lý bình thường
  if (req.body.password) {
    return next();
  }

  // const authHeader = req.headers.authorization;
  // console.log("Auth header:", authHeader); 
  // const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   console.log("Không có token"); // 
  //   return res.status(401).jsonp("Unauthorized");
  // }

  // let decoded;
  // try {
  //   decoded = jwt.verify(token, JWT_SECRET_KEY);
  // } catch (err) {
  //   console.log("JWT verify lỗi:", err.message);
  //   return res.status(401).jsonp("Invalid token");
  // }

  const id = Number(req.params.id);
  // if (decoded.sub !== id) {
  //   return res.status(403).jsonp("Forbidden");
  // }
  const existingUser = app.db.get("users").find({ id }).value();
  if (!existingUser) {
    return res.status(404).jsonp("User not found");
  }

  const updated = {
    ...existingUser,
    fullname: req.body.fullname ?? existingUser.fullname,
    email: req.body.email ?? existingUser.email,
  };

  app.db.get("users").find({ id }).assign(updated).write();

  const { password, ...safeUser } = updated;
  return res.status(200).jsonp(safeUser);
  // KHÔNG gọi next() ở đây -> request dừng lại tại đây, không bao giờ tới `auth`
});

app.use(auth);
app.use(router);

app.listen(4000, () => {
  console.log("JSON Server is running at http://localhost:4000");
});
