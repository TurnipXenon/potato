import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Profile} from "../clients/turnip/models/profile";

// from petraszd @ https://stackoverflow.com/a/59229831/17836168
export interface IAppContextData {
    profile?: Profile;
    setProfile?: Dispatch<SetStateAction<Profile | undefined>>;
}

// from Arya @ https://stackoverflow.com/a/70729199/17836168
const Context = createContext<IAppContextData>({});

export const AppProvider = ({children}: any) => {
    const [profile, setProfile] = useState<Profile | undefined>();
    return (
        <Context.Provider value={{profile, setProfile}}>
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => useContext(Context);