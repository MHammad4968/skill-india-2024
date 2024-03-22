const aws = require("aws-sdk");
const fs = require("fs");
const serverless = require("serverless-http");
const s3 = new aws.S3({
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRETKEY
});

async function uploadToS3(localFile, s3Folder) {
    const fileStream = fs.createReadStream(localFile);
    const fileName = localFile.split('/').pop();
    const params = {
      Bucket: process.env.BUCKET,
      Key: `${s3Folder}/${fileName}`,
      Body: fileStream
    };
  
    try {
      const data = await s3.upload(params).promise();
      console.log("Successfully uploaded file to S3:", data.Location);
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }
function getFromS3(s3FilePath, localFolder) {
return new Promise((resolve, reject) => {
    const params = {
    Bucket: process.env.BUCKET,
    Key: s3FilePath
    };

    s3.getObject(params, function(err, data) {
    if (err) {
        console.log("Error downloading file:", err);
        reject(err);
    } else {
        const localFilePath = `${localFolder}/${s3FilePath.split('/').pop()}`;
        fs.writeFileSync(localFilePath, data.Body);
        console.log("S3 Downloaded to:", localFilePath);
        resolve();
    }
    });
});
} 
module.exports = { uploadToS3, getFromS3 };
module.exports.handler = serverless(app);