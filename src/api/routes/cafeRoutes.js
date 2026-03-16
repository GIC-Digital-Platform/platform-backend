const { Router } = require('express');
const upload = require('../middleware/uploadMiddleware');
const { validateCreateCafe, validateUpdateCafe } = require('./validate');
const { writeLimiter } = require('../middleware/rateLimiter');

function cafeRoutes(cafeController) {
  const router = Router();

  router.get('/', cafeController.getCafes);
  router.post('/', writeLimiter, upload.single('logo'), validateCreateCafe, cafeController.createCafe);
  router.put('/:id', writeLimiter, upload.single('logo'), validateUpdateCafe, cafeController.updateCafe);
  router.delete('/:id', writeLimiter, cafeController.deleteCafe);

  return router;
}

module.exports = cafeRoutes;
