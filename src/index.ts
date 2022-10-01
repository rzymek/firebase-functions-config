import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { getProjectConfig } from "./projectConfig";

export const config = functions.https.onRequest(async (req, resp) => {
    try {
        const { projectId } = admin.app().options;
        resp.setHeader('Content-Type', 'application/json')
            .end(JSON.stringify({
                projectId,
                ...await getProjectConfig(),
            }, null, ' '));
    } catch (error: any) {
        console.error(error);
        resp.status(500).end(JSON.stringify({
            message: error.message,
            error
        }, null, ' '));
    }
})
