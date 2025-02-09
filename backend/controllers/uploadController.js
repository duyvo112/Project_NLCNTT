

const uploadController = {
    upload: async(req, res) => {
      res.json({ imageUrl: req.file.path });
    }
}
module.exports = uploadController;