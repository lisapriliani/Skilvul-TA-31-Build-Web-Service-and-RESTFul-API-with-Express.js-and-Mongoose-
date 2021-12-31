module.exports = (app) => {
  const instructors = require("../controllers/instructors");
  const router = require("express").Router();

  //post new instuctor
  router.post("/", instructors.create);

  //get all instructor
  router.get("/", instructors.findAll);

  //get instructor by id
  router.get("/:id", instructors.findOne);

  // edit constructor by id
  router.put("/:id", instructors.update);

  // delete instructor by id
  router.delete("/:id", instructors.delete);

  app.use("/instructors", router);
};
