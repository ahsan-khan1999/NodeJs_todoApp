const response_generator = (
  response_code,
  response_message,
  response_data = null
) => {
  if (!response_data)
    return { response_code: response_code, response_message: response_message };
  return {
    response_code: response_code,
    response_message: response_message,
    response_data: response_data,
  };
};

module.exports = {
  response_generator: response_generator,
};
