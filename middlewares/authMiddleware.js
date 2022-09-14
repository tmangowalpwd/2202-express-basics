export const authMiddleware = (req, res, next) => {
  if (req.headers.authorization !== "admin") {
    return res.status(401).json({
      message: "User unauthorized"
    })
  }

  next()
}