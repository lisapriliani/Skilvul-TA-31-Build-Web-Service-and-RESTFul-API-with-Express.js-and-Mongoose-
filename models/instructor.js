module.exports = (mongoose) => {
  let instructorSchema = mongoose.Schema({
    name: {
      type: String,
      minLength: 1,
      maxLength: 100,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
  });

  const Instructor = mongoose.model("instructor", instructorSchema);
  return Instructor;
};
