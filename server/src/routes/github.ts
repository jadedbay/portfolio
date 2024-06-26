import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

router.get('/:owner/:repo', (req, res) => {
    const { owner, repo } = req.params;
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
        },
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
});

export default router;