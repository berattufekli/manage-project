const multer = require("multer");
const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dir = `./uploads`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let timeStamp = Date.now().toString();
    console.log(timeStamp);
    let fileType = file.mimetype.split("/")[1];
    let fileName = file.originalname;
    if (fileType) {
      if (fileType === "svg+xml") {
        fileName = `${timeStamp}.${fileType.replace("+xml", "")}`;
        console.log(fileName);
      }
      else {
        fileName = `${timeStamp}.${fileType}`;
        console.log(fileName);
      }
    }
    cb(null, fileName);
    req.fileName = fileName;
  },
});

const multerHelper = multer({ storage: storage }).single("url");

module.exports.save = multerHelper;
