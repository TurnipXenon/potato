import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {TwirpFetchTransport} from "@protobuf-ts/twirp-transport";
import {TurnipClient} from "turnip_api";
import {LoginResponse} from "turnip_api/ts/rpc/turnip/service";

// from petraszd @ https://stackoverflow.com/a/59229831/17836168
export interface IAppContextData {
    profile?: LoginResponse;
    setProfile?: Dispatch<SetStateAction<LoginResponse | undefined>>;
    turnipClient?: TurnipClient;
}

// from Arya @ https://stackoverflow.com/a/70729199/17836168
const Context = createContext<IAppContextData>({});

export const AppProvider = ({children}: any) => {
    const [profile, setProfile] = useState<LoginResponse | undefined>();

    const createClient = (): TurnipClient => {
        let t = new TwirpFetchTransport({baseUrl: process.env.BASE_URL ?? "http://localhost:8000/api"})
        return new TurnipClient(t);
    }
    const [turnipClient] = useState<TurnipClient>(createClient);


    return (
        <Context.Provider value={{
            profile, setProfile,
            turnipClient
        }}>
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => useContext(Context);