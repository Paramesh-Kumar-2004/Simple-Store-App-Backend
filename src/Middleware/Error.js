

module.exports = (err, req, res, next) => {
    err.statuscode = err.statusbar || 500

    res.status(err.statuscode).json({
        "success": true,
        "message": err.message,
        "stack": err.stack
    })
}


