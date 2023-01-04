import React from 'react';
import Head from "next/head";
import styles from '../../styles/HomeIndex.module.css';
import {useAppContext} from "../../lib/util/app-context";
import {useRouter} from "next/router";
import {Card, CardActionArea, CardContent} from "@mui/material";
import useAuthAdminRedirect from "../../lib/util/use-auth-admin-redirect";

// todo(turnip): improve layout and extract css
export default function AdminIndex() {
    const {profile} = useAppContext();
    const router = useRouter();

    useAuthAdminRedirect();
    if (!profile) {
        return <></>;
    }

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
                </form>
                <Card>
                    <CardActionArea>
                        <CardContent
                            onClick={() => {
                                void router.push(`/admin/contents/`);
                            }}>
                            <h1>Contents</h1>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </main>
        </>
    );
}
