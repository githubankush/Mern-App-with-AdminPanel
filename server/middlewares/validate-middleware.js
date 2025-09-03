const validate = (schema) => {
    return async (req, res, next) => {
      try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
      } catch (err) {
        const status = 422; // Unprocessable Entity is standard for validation errors
        const message = err.errors ? err.errors.map(e => e.message).join(", ") : "Validation error";
  
        const error = {
          status,
          message
        };
  
        res.status(status).json({ error: message }); // Send response directly with all error messages
        // next(error); // Optionally, pass it to next() if you have centralized error handling
      }
    };
  };
  
  module.exports = validate;
  