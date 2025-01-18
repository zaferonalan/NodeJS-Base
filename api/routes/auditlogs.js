const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // ! Gelen isteğin body,params, query ve headers alanlarını response olarak dönüyoruz.
    res.json({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers
    })
})

module.exports = router;