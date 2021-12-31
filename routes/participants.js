module.exports = (app) => {
  const participants = require("../controllers/participants");
  const router = require("express").Router();

  //post new participant
  router.post("/", participants.create);

  //get all participant
  router.get("/", participants.findAll);

  //get participant by id
  router.get("/:id", participants.findOne);

  //edit participan by id
  router.put("/:id", participants.update);

  //delete participant by id
  router.delete("/:id", participants.delete);

  app.use("/participants", router);
};
