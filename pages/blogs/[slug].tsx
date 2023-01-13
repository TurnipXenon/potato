import React from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {createServerSideClient} from "../../lib/util/create-server-side-client";
import {ParsedUrlQuery} from "querystring";
import {Content} from 'turnip_api/ts/rpc/turnip/service';
import {FsCache, SlugIdPairMap} from "../../lib/util/fs-cache";
import ReactMarkdown from "react-markdown";
import {PageWrapper} from "../../lib/components/page-wrapper";

export interface BlogSlugProps {
    content: Content;
}


export const getStaticPaths: GetStaticPaths = async () => {
    const {turnipClient, options, hostCode} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "blogs"]
    }, options).response;

    const slugToId: SlugIdPairMap = {};
    const paths: Array<string | { params: ParsedUrlQuery, locale?: string }> = [];
    for (const content of response.itemList) {
        if (content.meta["slug"]) {
            slugToId[content.meta["slug"]] = content.primaryId;
            paths.push({
                params: {
                    slug: content.meta["slug"],
                    id: content.primaryId
                }
            });
        }
    }
    await FsCache.set(slugToId);

    return {
        paths,
        fallback: false
    };
};

const getErrorItem: GetStaticProps<BlogSlugProps> = () => {
    return {
        props: {
            content: {
                title: "",
                description: "",
                content: "Hi! error lol",
                tagList: [],
                meta: {},
                primaryId: "",
                authorId: "",
            }
        }
    };
};

export const getStaticProps: GetStaticProps<BlogSlugProps> = async (context) => {
    const {params} = context;
    if (!params?.slug) {
        // todo: get path
        // todo: improve warnings
        console.log("Issue during static site generation at path TODO");
        return getErrorItem(context);
    }

    const id: string = await FsCache.get(params.slug as string) as string;
    const {turnipClient, options} = await createServerSideClient();
    const response = await turnipClient.getContentById({
        primaryId: id,
    }, options).response;

    if (!response.item) {
        console.log("item is empty?");
        return getErrorItem(context);
    }

    const pbContent = response.item as Content;

    // todo: improve all that hardcoding
    return {
        props: {
            content: {
                title: pbContent.title,
                description: pbContent.description,
                content: pbContent.content,
                // media: pbContent.media ?? null,
                tagList: pbContent.tagList,
                accessDetails: pbContent.accessDetails,
                meta: pbContent.meta,
                primaryId: pbContent.primaryId,
                // createdAt: pbContent.createdAt,
                authorId: pbContent.authorId,
            }
        },
    };
};

export default function BlogsSlug(props: BlogSlugProps) {
    const {content} = props;
    return <PageWrapper>
        <main style={{
            textAlign: "center",
            padding: "2em",
            maxWidth: "50em",
            margin: "auto"
        }}>
            <h1>{content.title}</h1>
            <ReactMarkdown>
                {content.content}
            </ReactMarkdown>
        </main>
    </PageWrapper>;
};
