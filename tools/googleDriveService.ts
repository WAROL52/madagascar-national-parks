import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";
const GOOGLE_COMPTE = {
  type: "service_account",
  project_id: "madagascar-national-parks",
  private_key_id: "149b4932f02f9c40b87c9377803f7b9cfb92316b",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC9eO1N1Xgl7tMG\n2njZntuJSYcxB5pcO0Gp1Zi0oFZWNaC/ngmF7lPXXoxM27g1heAE6z2dyi7c/ZAV\nauDt5xALLiuPV+elehnWkmMxCrFTsvcv742B8iHo2a/ktxalwgY/+nlVdJ9tVksV\nj3FWNw14fhRHxoA8eLlfvaD9i4UZ4V2OMlQ7K19i9ExDreIu24tsnLHodz2opa6F\nniJrcarD1euzz6Di7Ojrzxmhw7gnkiiD9m6v9QumVaKSCN2D+SCO0u2ir0UpUgYQ\nMEBcPXEbJ9GXqRZI6p6Vqub8VVvchIGp+Bq8F6xLBwp9a6jeDEM+Pvn2n7y8BqKT\n8pgcrRyLAgMBAAECgf9y4F63dshPpSHfhd+bNsgI9OcVCeJ6wAT9mEzG7d1q1T2O\n8DBoOnMIoVzc8388YgE6HtRPMljJyKmldznpA/hazv7jRXsbECOaUHBBOXFKO7fH\n2Ihzd9ry0sAt2WZh0HhnUfXREPa8+IKyNFhw2xSrMFhkmeNKxsLCgG13AzLCRlZC\nqDi5t/olxSORMjKqtaYY2yfjWil+6ptCWUguCC63sWQWwsqCKFbqVmIxQuRGugHU\nN6uyPK4VrXFQSZwaF/34i/gq5QVlM+lK3BrPRspMKedSOYIjpNfTSiA0+Ihsvb4n\nplH58d+TU1cW2NffhIr2ndv8XHBaOtFjUiZUUmECgYEA551mCEfaz1GS89Qqe3KX\nak88GjOdrbACvx5nlqZnxPK19EuaLZE5Xo/x11lA6g+OYohYpielPHkDd7fnN8gf\n0LqTYYHjiHDklIvVR7MZ+ZyKo0RZYt5nLf3GhehDxFJcqT12nWJey9iPtsWSwPgh\n+XBzJ/CFuyvblXBUZHBtUasCgYEA0Wuu38JnjgzZZF3/BHkIHW2Y9atLSJgFX4D4\nKCxtyqmg6BkkzTwb71GtK7t9XWfuGaddk+VqZxeGjC1lg6IvKF/J1hzHa6kYtDSB\nMYTQPw8+AztrjKVI6u4lQUaRQVuFsuVwGEw1S7zydY1c2JK8PuD4wz8cfI62Qbk+\nH/yGQKECgYEAg1EdOVKr/2ErpSzEjUsyB+c2l1BudLxXQk6VwrdEHEjT2tdGadFt\nqmyIXGVRRaNeQgU15baSm4+s5KKS6HCBgVFXIDCJdaE0J/iECuvDrV8Qx3KID2Mz\nMsMwXFmMmnFr8dRUPPU58+8rxB+OjfPhJ1CXKazX1YAPNlICtxN7F5MCgYBo6prc\nrSd2KgfLWbAGTKB9Jcgo490+jDK86v7oGYITszHSta4TSBbyqaepLjAbWJMXtRqT\nmq7Y4RdeKOwfq2QWxQ54P0jFLh0bQuaqqVAvF3LI6b7y4meKky6E6lahOLndq0ai\nVaOpwwpxTBYExlaa5dia8IZT/Kdge+6c1cVooQKBgA6KyQYpm6kqUjJwA2XFYQQQ\nMXKJzh+v1RqeyZFWD0dgpCUKbimq0Kr58NR8w5g8/CHNdH+SJxfUM/ZCyI/X3S4Q\n5fAvL2Adoy8Cr8XbbmKlFHVNLqkpIi3VG9U/0YAyJTg2uB02Nz8lJc1DziD1ZFjn\nJS563ZU8yarMUooGGNwC\n-----END PRIVATE KEY-----\n",
  client_email:
    "mnp-service-compte@madagascar-national-parks.iam.gserviceaccount.com",
  client_id: "117910786235214399619",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/mnp-service-compte%40madagascar-national-parks.iam.gserviceaccount.com",
};
const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.photos.readonly",
];

const auth = new google.auth.GoogleAuth({
  scopes: SCOPES,
  keyFile: "./pages/api/madagascar-national-parks-149b4932f02f.json",
});

// Create a new instance of the Drive API
const drive = google.drive({ version: "v3", auth });

export class GoogleDriveService {
  static async uploadFile(file: formidable.File) {
    const fileResponse = await drive.files.create({
      requestBody: {
        name: file.originalFilename, //file.originalname,
        // parents: "1Bnu8f6A8gqA3z_7rhW_wVNMB4KoKukw3",
      },
      media: {
        body: fs.createReadStream(file.filepath),
        mimeType: file.mimetype,
      },
      fields: "id,name,mimeType",
    });
    return fileResponse;
  }
  static async getListFile() {
    const fileResponse = await drive.files.list({});
    return fileResponse;
  }
  static async getFile(fileId: string) {
    const fileResponse = await drive.files.get({
      fileId,
      fields: "id,name,mimeType",
    });
    return fileResponse;
  }
  static async deleteFile(fileId: string) {
    const fileResponse = await drive.files.delete({
      fileId,
      fields: "id,name,mimeType",
    });
    return fileResponse;
  }
}
