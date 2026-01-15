export function authMidleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" })
  }

  if (authHeader != "mock") {
    return res.status(401).json({ message: "Token invalido" })
  }

  next()
}
