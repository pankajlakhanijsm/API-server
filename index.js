const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require("fs");
const sharp = require("sharp");


const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static("./uploads"));

app.post('/profile',upload.single("avatar"), async (req, res) => {

  fs.access("./uploads", (error) => {
    if (error) {
      fs.mkdirSync("./uploads");
    }
  });
    console.log(req.file);
    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.jpeg`;
    
    const filepath = `./uploads/ + ${ref}`;
    const outputPath = `./output/ + ${ref}`;
    // Jimp.read(filepath, (err, image) => {
    //   if (err) throw err;
    //   image
    //   .quality(50) // set Image quality
    //   .write(outputPath);
    // })
    return res.json({ message: filepath })
    await sharp(buffer)
    .webp({ quality: 20 })
    .toFile("./uploads/" + ref);
});
app.listen(4000,()=>{console.log("server is runing on port 4000")});