const processJSONLFile = require('../helpers/readFileLineByLine')
const {getAllProductsWithVariant} = require('../handlers/productHandler')

const importAll = async ( req, res) =>{
    try {
        const ans = await processJSONLFile()
        res.status(200).send(ans)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllProductsWithVariants = async( req, res) => {
    try {
        const ans = await getAllProductsWithVariant()
        res.status(200).send(ans)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {importAll, getAllProductsWithVariants}