import { VercelRequest, VercelResponse } from "@vercel/node";
import generateIcs from "../src/generateIcs";
import rateLimiter from "lambda-rate-limiter";

const limit = rateLimiter({
    interval: 1000,
}).check;

export default async (request: VercelRequest, response: VercelResponse) => {
    try {
        await limit(1, request.headers["x-real-ip"] as string);
    } catch (err) {
        return response.status(429);
    }

    const ics = await generateIcs();

    response.setHeader("content-type", "text/plain").send(ics);
};
