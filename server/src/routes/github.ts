import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

router.get('/:owner/:repo', async (req, res) => {
    const { owner, repo } = req.params;
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
        },
    });
    const data = await response.json();
    res.json(data);
});

export default router;