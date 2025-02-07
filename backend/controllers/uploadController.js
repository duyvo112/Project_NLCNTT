

const uploadController = {
    upload: (req, res) => {
        res.json({ imageUrl: req.file.path });
    }
}
module.exports = uploadController;