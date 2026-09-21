const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");
const { createGetProjectsHandler } = require("./get-projects");

if (!admin.apps.length) admin.initializeApp();

exports.getProjects = functions.region("us-central1").runWith({ memory: "256MB" })
  .https.onRequest(createGetProjectsHandler({
    getDb: () => admin.firestore(),
    logger: functions.logger,
  }));
