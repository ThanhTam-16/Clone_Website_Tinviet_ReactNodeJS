export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const message = err.message || 'Internal Server Error';
  const status = err.statusCode || 500;

  res.status(status).json({
    message,
    // bật debug khi dev, deploy thì tắt
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
