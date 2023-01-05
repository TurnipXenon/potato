// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

type ErrorMessage = {
    message: string;
    error_code: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorMessage>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: "method not allowed",
            error_code: 1 // todo: improve
        });
    }

    // todo: get header and do auth check
    const token: string = req.headers['authorization'] ?? "";
    if (!token) {
        return res.status(401).json({
            message: "unauthorized",
            error_code: 0
        });
    }

    const tokenValue: string = token.split(" ")[1] ?? "";
    if (!tokenValue) {
        return res.status(401).json({
            message: "unauthorized; authorization header found but no token found",
            error_code: 1
        });
    }

    const path = (req.body && req.body["path"]) ?? "";
    if (path == "") {
        return res.status(400).json({
            message: "empty or missing path field in json body",
            error_code: 1
        });
    }

    if (tokenValue !== process.env.REVALIDATE_TOKEN) {
        return res.status(403).json({
            message: "forbidden",
            error_code: 1,
        });
    }

    try {
        await res.revalidate(path);
        return res.json({
            message: "revalidate successful!",
            error_code: 0,
        });
    } catch (err) {
        // todo: error handling
        console.log(err);
        return res.status(500).send({
            message: "error validating",
            error_code: 1,
        });
    }
}
