import jwt from "jsonwebtoken"

export function authMidleware(req, res, next) {
  const token = extractToken(req.headers.authorization);

  if (!token) return res.status(401).json({ error: "Token invalido"})
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.sub;

    next()
  } catch (error) {
    return res.status(401).json({ error: "Token invalido ou expirado" })
  }
}

function extractToken(authHeader) {
  if (!authHeader) return null;
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.substring(7);
}
