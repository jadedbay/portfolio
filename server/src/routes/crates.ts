import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

router.get('/:crate', (req, res) => {
    const { crate } = req.params;
    fetch(`https://crates.io/api/v1/crates/${crate}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
});

export default router;