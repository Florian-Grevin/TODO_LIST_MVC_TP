const asyncHandler = require('express-async-handler');

const todoMiddleware = asyncHandler(async (req, res, next) => {
  const startDate = Date.now();

  res.on('finish', () => {
    const endDate = Date.now();
    console.log(`Durée: ${endDate - startDate} ms`);
  });

  next();
});
 
module.exports = todoMiddleware