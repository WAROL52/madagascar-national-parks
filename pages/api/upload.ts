import multer from "multer";
import cors from "cors";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "app/files/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  //   await cors()(req, res);

  if (req.method === "POST") {
    await upload.single("file")(req, res, (error) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send("File uploaded successfully!");
      }
    });
  }
}
