module.exports = (err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong Service!",
    });
};
