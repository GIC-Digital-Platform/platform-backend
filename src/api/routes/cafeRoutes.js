const { Router } = require('express');
const upload = require('../middleware/uploadMiddleware');
const { validateCreateCafe, validateUpdateCafe } = require('../middleware/validate');

function cafeRoutes(cafeController) {
  const router = Router();

  router.get('/', cafeController.getCafes);
  router.post('/', upload.single('logo'), validateCreateCafe, cafeController.createCafe);
  router.put('/:id', upload.single('logo'), validateUpdateCafe, cafeController.updateCafe);
  router.delete('/:id', cafeController.deleteCafe);

  return router;
}

module.exports = cafeRoutes;
