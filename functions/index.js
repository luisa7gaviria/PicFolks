const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const busboy = require("busboy");
const admin = require("firebase-admin");

admin.initializeApp();

exports.setImage = functions.https.onRequest((req, res) => {
  const bby = busboy({headers: req.headers});
  const tempFilePath = path.join(os.tmpdir(), "image.jpg");
  const fileWriteStream = fs.createWriteStream(tempFilePath);
  let originFileName;

  bby.on("file", (fieldname, file, filename, encoding, mimetype) => {
    file.pipe(fileWriteStream);
    originFileName = path.parse(filename.filename).name;
  });

  bby.on("field", (fieldname, val) => {
    res.status(500).send("Only picture files are allowed");
  });

  bby.on("finish", () => {
    fileWriteStream.on("close", async () => {
      try {
        const processedImg = await sharp(tempFilePath)
            .resize(720, null, {fit: "inside"})
            .png()
            .toBuffer();

        const bucket = admin.storage().bucket();
        const blob = bucket.file(`${originFileName}.png`);

        const options = {
          metadata: {
            contentType: "image/png",
          },
        };

        await blob.save(processedImg, options);
        await fs.unlink(tempFilePath, (err) => {
          if (err) {
            throw err;
          }
        });

        res.status(200).send("The picture was uploaded successfully");
      } catch (err) {
        res.status(500).send(`An error occurred: ${err}`);
      }
    });

    fileWriteStream.end();
  });

  bby.end(req.rawBody);
});
