const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        application: "Jenkins CI/CD API",
        version: "1.0.0",
        status: "Running"
    });
});

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "Healthy",
        service: "Jenkins CI/CD API",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

router.get("/deployment", (req, res) => {
    res.status(200).json({
        pipeline: "Jenkins",
        deployment: "Ready",
        timestamp: new Date().toISOString()
    });
});

module.exports = router;