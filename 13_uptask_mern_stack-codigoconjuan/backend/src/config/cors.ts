import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];
        console.info("origin", origin);
        console.info("whitelist", whitelist);
        if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};