import {useAppContext} from "./app-context";
import {useRouter} from "next/router";
import {useEffect} from "react";
import React from 'react';

const useAuthAdminRedirect = () => {
    const {profile} = useAppContext();
    const router = useRouter();

    // re-route to login if not in the right location
    useEffect(() => {
        if (!profile) {
            void router.push("/admin/login/");
        }
    }, [profile, router])

    return <></>
}

export default useAuthAdminRedirect;