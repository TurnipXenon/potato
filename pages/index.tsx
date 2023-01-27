import React from 'react';
import "./HomeIndex.module.css";
import {fromContentListToGameProjectList, GameProjectProps} from "../lib/models/game-project-props";
import {GetStaticProps} from "next";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {ReinhardHome} from "../lib/components/home/reinhard-home";
import {createServerSideClient} from "../lib/util/create-server-side-client";

export interface PageMetaProps {
    aboutLite: string;
    about: string;
    header: string;
    social: string;
}

export interface HomeIndexProps {
    gameProjectList: GameProjectProps[];
    pageMeta: PageMetaProps;
}

export const getStaticProps: GetStaticProps<HomeIndexProps> = async () => {
    // todo get contents from database
    const {turnipClient, options, hostCode} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "home"]
    }, options).response;

    // todo response.itemList: Content -> GameProjectProp
    const gameRawList: Content[] = [];
    const pageMeta: PageMetaProps = {
        about: "",
        header: "",
        social: "",
        aboutLite: "",
    };
    for (const content of response.itemList) {
        if (content.tagList.includes("game")) {
            gameRawList.push(content);
        } else if (content.title === `${hostCode} home`) {
            pageMeta.about = content.meta['about'] ?? "";
            pageMeta.aboutLite = content.meta['about-lite'] ?? "";
            pageMeta.header = content.meta['header'] ?? "";
            pageMeta.social = content.meta['social'] ?? "";
        }
    }

    const gameShowCase = fromContentListToGameProjectList(gameRawList);

    return {
        props: {
            gameProjectList: gameShowCase,
            pageMeta: pageMeta,
        },
    };
};

export default function HomeIndex(props: HomeIndexProps) {
    return <ReinhardHome {...props}/>;
};