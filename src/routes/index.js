const { Router } = require('express');

const rApi = require('./apiRouter')
const rProducts = require('./productsRouter')

const router = Router();

router.use("/api", rApi)
router.use("/products", rProducts)

module.exports = router;

