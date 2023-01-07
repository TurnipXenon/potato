import {IAppContextData, useAppContext} from "./app-context";
import {NextRouter, useRouter} from "next/router";
import {useEffect} from "react";
import React from 'react';

// todo: refactor remaining
export interface useAuthAdminRedirectProps extends IAppContextData {
    router: NextRouter;
};

const useAuthAdminRedirect = (): useAuthAdminRedirectProps => {
    const context = useAppContext();
    const router = useRouter();

    // re-route to login if not in the right location
    useEffect(() => {
        if (!context.profile) {
            void router.push("/admin/login/");
        }
    }, [context.profile, router]);

    return {router, ...context};
};

export default useAuthAdminRedirect;