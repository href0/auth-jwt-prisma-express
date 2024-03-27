export const response = (res, data = null, message = 'success', status = 200, pagination = null) => {
  let resp = {
    statusCode : status,
    message    : message,
    data       : data
  }
  if(pagination) {
    resp['pagination'] = pagination
  }
  return res.status(status).json(resp)
}