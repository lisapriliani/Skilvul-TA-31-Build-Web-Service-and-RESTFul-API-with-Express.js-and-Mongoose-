const express = require("express");
const db = require("./models");
const app = express();
const port = process.env.PORT || 3000;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log("Can't connect to the database!", error);
    process.exit();
  });

app.use(express.json());

require("./routes/instructors")(app);
require("./routes/courses")(app);
require("./routes/participants")(app);

app.listen(port, () => {
  console.log(`This app connect at http://localhost:${port}`);
});
