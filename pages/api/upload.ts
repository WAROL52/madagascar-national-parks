import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { GoogleDriveService } from "@/tools/googleDriveService";

export const config = {
  api: {
    bodyParser: false,
  },
};

// ... autres configurations nécessaires à l'authentification

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unexpected error" });
    }

    const file = files.file as formidable.File;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }
    try {
      const uploadedFile = await GoogleDriveService.uploadFile(file);

      console.log(
        "[GoogleDriveService]:uploadedFile",
        uploadedFile.statusText,
        uploadedFile.data
      );

      return res.status(200).json(uploadedFile.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unexpected error" });
    }
  });
}
