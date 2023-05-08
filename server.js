const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const handlebars = require("express-handlebars");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
