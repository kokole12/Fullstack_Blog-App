export default function errorHandler (err, req, res, next) {
  console.log(err)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({ status: 'error', Message: err.Message })
}
