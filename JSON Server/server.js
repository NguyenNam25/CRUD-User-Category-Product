const jsonServer = require("json-server");
const auth = require("json-server-auth");
const bcrypt = require("bcryptjs");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);

app.use(auth);

app.use(async (req, res, next) => {
  if (
    (req.method === "PUT" || req.method === "PATCH") &&
    req.path.startsWith("/users/")
  ) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
  }
  next();
});

app.use(router);

app.listen(4000, () => {
  console.log("JSON Server is running at http://localhost:4000");
});
