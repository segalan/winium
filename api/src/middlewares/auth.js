const { verify } = require('jsonwebtoken');

const isPublicRoute = ({ method, originalUrl }) => {
  const publicRoutes = {
    GET: ['/varieties', '/wines', '/wines/top', '/reviews/wine'],
    POST: ['/login', '/user'],
  };

  for(let i = 0; i < publicRoutes[method].length; i++) {
    if(originalUrl.startsWith(publicRoutes[method][i])) return true;
  }

  return false;
}

module.exports = (req, res, next) => {
  if (isPublicRoute(req)) return next();

  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Token não fornecido.');

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send('Não autorizado.');
  }
};
