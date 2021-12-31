module.exports = (app) => {
  const courses = require("../controllers/courses");
  const router = require("express").Router();

  //post new course
  router.post("/", courses.create);
  //get all course
  router.get("/", courses.findAll);
  //get course by id
  router.get("/:id", courses.findOne);
  //edit course by id
  router.put("/:id", courses.update);
  // delete course by id
  router.delete("/:id", courses.delete);

  app.use("/courses", router);
};
