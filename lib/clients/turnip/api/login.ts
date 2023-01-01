import {TurnipClient} from "turnip_api";
import {LoginResponse} from "turnip_api/ts/rpc/turnip/service";
import {Dispatch, SetStateAction} from "react";
import {RpcOptions} from "@protobuf-ts/runtime-rpc";

export interface loginProps {
    turnipClient: TurnipClient;
    username: string;
    password: string;
    setProfile: Dispatch<SetStateAction<LoginResponse | undefined>>;
    setOptions: Dispatch<SetStateAction<RpcOptions | undefined>>;
}

export const login = (props: loginProps) => {
    props.turnipClient.login({username: props.username, password: props.password})
        .then(response => {
            props.setOptions({
                meta: {
                    "Authorization": `Token ${response.response.token?.accessToken}`
                }
            });
            props.setProfile(response.response);
        }).catch(err => {
        console.log('error', err)
        // todo: relay to frontend with wrong credentials
    })
}