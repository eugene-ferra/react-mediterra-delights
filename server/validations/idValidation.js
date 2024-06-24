const idValidationSchema = {
  id: {
    exists: {
      errorMessage: "id is required!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "id should be a mongo id!",
    },
  },
};

export default idValidationSchema;
