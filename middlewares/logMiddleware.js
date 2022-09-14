export const logMiddleware = (req, res, next) => {
  const date = new Date()

  const dateFormat = `${date.getDate()}-${date.getMonth() + 1
    }-${date.getFullYear()}`
  const timeFormat = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`

  console.log(`[${dateFormat} ${timeFormat}] ${req.method} ${req.path}`)

  if (Object.keys(req.body).length) {
    console.log("Data:", req.body)
  }

  next()
}

