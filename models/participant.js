module.exports = (mongoose) => {
  let participantSchema = mongoose.Schema({
    name: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      maxLength: 50,
      required: false,
    },
    phone: {
      type: String,
      maxLength: 13,
      required: false,
    },
    courses: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
  });

  const Participant = mongoose.model("Participant", participantSchema);
  return Participant;
};
