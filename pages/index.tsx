import React from 'react';
import "./HomeIndex.module.css";
import {fromContentListToGameProjectList, GameProjectProps} from "../lib/models/game-project-props";
import {GetStaticProps} from "next";
import {createClient} from "../lib/util/app-context";
import {TurnipClient} from "turnip_api";
import {RpcOptions} from "@protobuf-ts/runtime-rpc";
import {loginAwait} from "../lib/clients/turnip/api/login";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {ReinhardHome} from "../lib/components/home/reinhard-home";

export interface PageMetaProps {
    about: string;
    header: string;
    social: string;
}

export interface HomeIndexProps {
    gameProjectList: GameProjectProps[];
    pageMeta: PageMetaProps;
}

export default function HomeIndex(props: HomeIndexProps) {
    return <ReinhardHome {...props}/>;
};

export interface ServerSideSetupProps {
    turnipClient: TurnipClient;
    options: RpcOptions;
}

export const createServerSideClient = async (): Promise<ServerSideSetupProps> => {
    const t = createClient();
    const o = await loginAwait({
        turnipClient: t,
        username: process.env.HOST_USERNAME ?? "a",
        password: process.env.HOST_PASSWORD ?? "a",
    });
    return {
        turnipClient: t,
        options: o,
    };
};

export const getStaticProps: GetStaticProps<HomeIndexProps> = async () => {
    // todo get contents from database
    const hostCode = process.env.HOST_CODE ?? "";
    const {turnipClient, options} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "home"]
    }, options).response;

    // todo response.itemList: Content -> GameProjectProp
    const gameRawList: Content[] = [];
    const pageMeta: PageMetaProps = {
        about: "",
        header: "",
        social: ""
    };
    for (const content of response.itemList) {
        if (content.tagList.includes("game")) {
            gameRawList.push(content);
        } else if (content.title === `${hostCode} home`) {
            pageMeta.about = content.meta['about'] ?? "";
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
