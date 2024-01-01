export const validate = async (schema, request) => {
  const result = await schema.validate(request, {
    abortEarly : false
  })

  return result
}