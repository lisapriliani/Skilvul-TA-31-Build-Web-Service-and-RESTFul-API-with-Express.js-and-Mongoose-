module.exports = (mongoose) => {
  let courseSchema = mongoose.Schema({
    title: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
    },
    description: {
      type: String,
      minLength: 1,
      maxLength: 500,
      required: true,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "instructor",
      required: true,
    },
    scheduleDateTime: {
      type: Date,
      required: true,
    },
  });

  const Course = mongoose.model("course", courseSchema);
  return Course;
};
