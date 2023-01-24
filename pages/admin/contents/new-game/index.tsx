import React from "react";
import {ContentNewPage} from "../../../../lib/components/content-new-page";
import {ContentUtil} from "../../../../lib/util/content-util";

export default function ContentNewGameIndex() {
    const defaultContent = ContentUtil.createDefaultContent();
    defaultContent.tagList = [
        "todo: tomato/turnip/tangerine",
        "home",
        "game",
        "todo: showcase"
    ];
    defaultContent.meta = {
        "linkList": "[\n{\"externalBadge\": \"itchBadge\", \"link\": \"turnipxenon.itch.io/pengi\", \"altText\": \"\"}\n]",
        "tagline": "",
        "timeline": "Jan 2020 - Jan 2020",
        "videoList": "[\n{\"src\": \"/header-pengi.webm\", \"type\": \"video/webm\"}\n]",
    };

    return <ContentNewPage content={defaultContent}/>;
}