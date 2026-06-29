const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    const error = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(400).json({ success: false, error });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid customer ID' });
  }

  const statusCode = err.statusCode || 500;
  const error = err.message || 'Internal server error';

  res.status(statusCode).json({ success: false, error });
};

export default errorHandler;
