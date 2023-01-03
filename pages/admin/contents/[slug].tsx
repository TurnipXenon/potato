import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useAppContext} from "../../../lib/util/app-context";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import useEffectOnce from "../../../lib/util/use-effect-once";
import useAuthAdminRedirect from "../../../lib/util/use-auth-admin-redirect";
import {ContentEdit} from "../../../lib/components/content-edit";

export default function ContentSlug() {
    const {profile, contentListProp, setContentListProp, turnipClient, options} = useAppContext();
    // todo: refactor
    const [content] = useState<Content>((() => {
        if (contentListProp.length !== 1) {
            return {
                title: "",
                description: "",
                content: "",
                tagList: [],
                meta: {"client_error": "wrong contentListProp set"},
                primaryId: "",
                authorId: "",
            };
        }
        return contentListProp[0];
    })());

    const router = useRouter();

    // re-route if setting the contentList went wrong
    useEffect(() => {
        if (content.meta["client_error"] === "wrong contentListProp set") {
            alert("Something went wrong!");
            void router.push("/admin/contents/");
        }
    }, [content, router]);
    // cleanup to avoid data leak
    useEffectOnce(() => {
        setContentListProp!([]); // avoid data leak
    });

    // for faster design iteration, comment this and then later uncomment
    // tip: add a to//do: comment after redesign at the top so you don't forget!
    useAuthAdminRedirect();
    if (!profile) {
        return <></>;
    }

    return ContentEdit({
        content: content
    });
}
