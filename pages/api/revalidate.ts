// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {RevalidatePathResponse} from "potato_api/ts/rpc/potato/models";

type ErrorMessage = {
    message: string;
    error_code: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RevalidatePathResponse>
) {
    const defaultResponse: RevalidatePathResponse = {
        path: "",
        serviceName: process.env.SERVICE_NAME ?? "",
        message: "unknown error",
        errorCode: 400 // todo: improve
    };

    if (req.method !== 'POST') {
        defaultResponse.message = "method not allowed";
        defaultResponse.errorCode = 405;
        return res.status(405).json(defaultResponse);
    }

    // todo: get header and do auth check
    const token: string = req.headers['authorization'] ?? "";
    if (!token) {
        defaultResponse.message = "unauthorized";
        defaultResponse.errorCode = 401;
        return res.status(401).json(defaultResponse);
    }

    const tokenValue: string = token.split(" ")[1] ?? "";
    if (!tokenValue) {
        defaultResponse.message = "unauthorized; authorization header found but no token found";
        defaultResponse.errorCode = 401;
        return res.status(401).json(defaultResponse);
    }

    // todo: use the generated twirp for validation here
    const path = (req.body && req.body["path"]) ?? "";
    if (path == "") {
        defaultResponse.message = "empty or missing path field in json body";
        defaultResponse.errorCode = 401;
        return res.status(401).json(defaultResponse);
    }

    if (tokenValue !== process.env.TURNIP_TOKEN) {
        defaultResponse.message = "forbidden";
        defaultResponse.errorCode = 403;
        return res.status(403).json(defaultResponse);
    }

    try {
        await res.revalidate(path);
        const resp: RevalidatePathResponse = {
            path: path,
            serviceName: "tomato", // todo: change in the future
            message: "revalidate successful!",
            errorCode: 0,
        };
        return res.json(resp);
    } catch (err) {
        defaultResponse.message = "error validating path";
        defaultResponse.errorCode = 500;
        // todo: error handling
        console.log(err);
        return res.status(500).send(defaultResponse);
    }
}
