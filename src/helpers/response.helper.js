export const response = (res, data = null, message = 'success', status = 200) => {
  return res.status(status).json({
    statusCode : status,
    message    : message,
    data       : data
  })
}