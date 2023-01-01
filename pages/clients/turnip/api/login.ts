import {TurnipClient} from "turnip_api";
import {LoginResponse} from "turnip_api/ts/rpc/turnip/service";

export const login = (
    turnipClient: TurnipClient,
    username: string,
    password: string,
    setProfile: ((value: (((prevState: (LoginResponse | undefined)) => (LoginResponse | undefined)) | LoginResponse | undefined)) => void)
) => {
    turnipClient.login({username: username, password: password})
        .then(response => {
            console.log(response.response);
            setProfile(response.response);
        }).catch(err => {
        console.log('error', err)
        // todo: relay to frontend with wrong credentials
    })
}