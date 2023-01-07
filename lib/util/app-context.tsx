import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {TwirpFetchTransport} from "@protobuf-ts/twirp-transport";
import {TurnipClient} from "turnip_api";
import {Content, LoginResponse} from "turnip_api/ts/rpc/turnip/service";
import {RpcOptions} from "@protobuf-ts/runtime-rpc";

// from petraszd @ https://stackoverflow.com/a/59229831/17836168
export interface IAppContextData {
    profile?: LoginResponse;
    setProfile?: Dispatch<SetStateAction<LoginResponse | undefined>>;
    turnipClient?: TurnipClient;
    options?: RpcOptions;
    setOptions?: Dispatch<SetStateAction<RpcOptions | undefined>>;
    contentListProp: Content[];
    setContentListProp?: Dispatch<SetStateAction<Content[]>>;
}

// from Arya @ https://stackoverflow.com/a/70729199/17836168
const Context = createContext<IAppContextData>({
    contentListProp: [],
});

export const createClient = (): TurnipClient => {
    const turnipUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api";
    const t = new TwirpFetchTransport({baseUrl: turnipUrl});
    console.log(`Turnip url is at ${turnipUrl}`);
    return new TurnipClient(t);
};

export const AppProvider = ({children}: any) => {
    const [profile, setProfile] = useState<LoginResponse | undefined>();
    const [options, setOptions] = useState<RpcOptions | undefined>();
    const [contentListProp, setContentListProp] = useState<Content[]>([]);

    const defaultClient = createClient();
    const [turnipClient] = useState<TurnipClient>(defaultClient);

    return (
        <Context.Provider value={{
            profile,
            setProfile,
            turnipClient,
            options,
            setOptions,
            contentListProp,
            setContentListProp,
        }}>
            {children}
        </Context.Provider>
    );
};

export const useAppContext = () => useContext(Context);