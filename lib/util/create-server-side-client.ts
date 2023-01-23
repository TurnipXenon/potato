import {createClient} from "./app-context";
import {loginAwait} from "../clients/turnip/api/login";
import {RpcOptions} from "@protobuf-ts/runtime-rpc";
import {TurnipClient} from "turnip_api";

let options: RpcOptions | null = null;


export interface ServerSideSetupProps {
    turnipClient: TurnipClient;
    options: RpcOptions;
    hostCode: string;
}

export const createServerSideClient = async (): Promise<ServerSideSetupProps> => {
    const t = createClient();
    const hostCode = process.env.HOST_CODE ?? "";

    let o: RpcOptions;
    if (options === null) {
        o = await loginAwait({
            turnipClient: t,
            username: process.env.HOST_USERNAME ?? "a",
            password: process.env.HOST_PASSWORD ?? "a",
        });
    } else {
        o = options;
    }

    if (options === null) {
        options = o;
    }

    return {
        hostCode,
        turnipClient: t,
        options: o,
    };
};