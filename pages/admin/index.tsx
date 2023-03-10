import React from 'react';
import Head from "next/head";
import styles from '../HomeIndex.module.css';
import useAuthAdminRedirect from "../../lib/util/use-auth-admin-redirect";
import {AdminCardRedirect, AdminCardRedirectProps} from "../../lib/components/admin-card-redirect";

// todo(turnip): improve layout and extract css
export default function AdminIndex() {
    const {profile, router} = useAuthAdminRedirect();
    if (!profile) {
        return <></>;
    }

    const redirectList: AdminCardRedirectProps[] = [
        {
            label: "Content",
            url: "/admin/contents/",
            router
        },
        {
            label: "Revalidate path",
            url: "/admin/revalidate/",
            router
        },
    ];

    return (
        <>
            <Head>
                <title>Home - Admin</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <form className={styles.center} style={{["display"]: "flex", ["flexDirection"]: "column"}}>
                    <h1>Admin</h1>
                    {
                        redirectList.map((value) => {
                            return <AdminCardRedirect key={value.label} {...value}/>;
                        })
                    }
                </form>
            </main>
        </>
    );
}
