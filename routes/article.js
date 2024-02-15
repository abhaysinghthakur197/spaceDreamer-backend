const { Router } = require('express')
const router = Router();

// Adding multer to upload the file 
const multer = require('multer')
const path = require('path')
//  *** //

const Article = require('../models/article')

//  uploading the file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });
//****//

// get route for article view
router.get('/:id', async (req, res) => {
    const { id } = req.params
    // console.log(id)
    try {
        const getArticle = await Article.findById(id);
        // console.log("got the article", getArticle)
        return res.json({message: "Got the article",getArticle})
    }catch (err){
        console.log("Error when finding specific article in DB",err)
        return res.json({message: err});
    }
})

// post route
router.post("/addnews", upload.single("coverImage"), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    // console.log(req.user._id)
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }
    if (!req.file) {
        return res.status(402).json({ error: 'No file received' });
    }

    const { title, body } = req.body;
    const article = await Article.create({
        title,
        body,
        // createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });
    console.log(article);
    return res.json({ message: 'uploaded news' });
});

module.exports = router;