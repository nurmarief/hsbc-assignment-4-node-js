const processError = (error, req, res, next) => {
    return res.status(500).json({
        message: error.message || 'operation failed, an error occured'
    })
}

module.exports = processError