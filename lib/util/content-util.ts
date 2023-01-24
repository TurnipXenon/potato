import {Content} from "turnip_api/ts/rpc/turnip/service";

export const ContentUtil = {
    createDefaultContent: (): Content => {
        return {
            title: "",
            description: "",
            content: "",
            tagList: [],
            meta: {},
            primaryId: "10000000-0000-0000-0000-e4d1a9ddc777", // todo: make this optional
            authorId: "",
            slug: "",
        };
    },
    createClientErrorContent: (message: string): Content => {
        const defaultContent = ContentUtil.createDefaultContent();
        defaultContent.meta = {
            "client_error": message
        };
        return defaultContent;
    }
};