const errorHandler = (userId, err) => {
  if (!userId) {
    throw new Error(err);
  }
};

const newError = (err) => {
  throw new Error(err);
};

export { errorHandler, newError };
