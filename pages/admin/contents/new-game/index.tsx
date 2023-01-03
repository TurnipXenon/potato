import React from "react";
import {ContentNewPage} from "../../../../lib/components/content-new-page";

export default function ContentNewGameIndex() {
    return <ContentNewPage content={{
        title: "",
        description: "",
        content: "",
        tagList: [
            "todo: tomato/turnip/tangerine",
            "home",
            "game",
            "todo: showcase"
        ],
        meta: {
            "linkList": "[\n{\"externalBadge\": \"itchBadge\", \"link\": \"turnipxenon.itch.io/pengi\", \"altText\": \"\"}\n]",
            "tagline": "",
            "timeline": "Jan 2020 - Jan 2020",
            "videoList": "[\n{\"src\": \"/header-pengi.webm\", \"type\": \"video/webm\"}\n]",
        },
        primaryId: "10000000-0000-0000-0000-e4d1a9ddc777", // todo: make this optional
        authorId: "",
    }}/>;
}