const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");
const { createGetProjectsHandler } = require("./get-projects");
const { createAddProjectHandler } = require("./add-project");

if (!admin.apps.length) admin.initializeApp();

exports.getProjects = functions.region("us-central1").runWith({ memory: "256MB" })
  .https.onRequest(createGetProjectsHandler({
    getDb: () => admin.firestore(),
    logger: functions.logger,
  }));

exports.addProject = functions.region("us-central1").runWith({
  memory: "256MB",
  secrets: ["PROJECTS_API_KEY"],
}).https.onRequest(createAddProjectHandler({
  getDb: () => admin.firestore(),
  getStorage: () => admin.storage().bucket(process.env.STORAGE_BUCKET || "tecnofuision-it.firebasestorage.app"),
  getApiKey: () => process.env.PROJECTS_API_KEY,
  getFieldValue: admin.firestore.FieldValue,
  logger: functions.logger,
}));
