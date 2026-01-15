import jwt from "jsonwebtoken"

export function authMidleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" })
  }

  const parts = authHeader.split(" ");

  if (parts.lengh !== 2) {
    return res.status(401).json({ message: "Token mal formatado" })
  }

  const [scheme, token] = parts

  if (scheme !== "Bearer") {
    return res.status(401).json({ message: "Token mal formatado" })
  }

  try {
    const decoded = jwt.verify(token, "segredo_mockado")

    req.userId = decoded.sub;

    next()
  } catch (error) {
    return res.status(401).json({ error: "Token invalido ou expirado" })
  }
}
