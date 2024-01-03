const { Router } = require('express');

const rApi = require('./api')
const rProducts = require('./products')

const router = Router();

router.use("/api", rApi)
router.use("/products", rProducts)

module.exports = router;

