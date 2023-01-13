import {UnderConstructionCard} from "../../lib/components/under-construction-card";
import {PageWrapper} from "../../lib/components/page-wrapper";
import {GetStaticProps} from "next";
import {createServerSideClient} from "../../lib/util/create-server-side-client";
import {BlogBlurb} from "../blogs";

export interface SiteMapProps {
    contentList: BlogBlurb[];
}

export const getStaticProps: GetStaticProps<SiteMapProps> = async (context) => {
    const {turnipClient, options, hostCode} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "blogs"]
    }, options).response;

    const contentList: BlogBlurb[] = [];
    for (const pbContent of response.itemList) {
        if (pbContent.meta["slug"]) {
            contentList.push({
                title: pbContent.title,
                description: pbContent.description,
                blurb: pbContent.meta["blurb"] ?? "",
                tagList: pbContent.tagList, // todo sanitize tag list!
                slug: pbContent.meta["slug"],
            });
        }
    }

    return {
        props: {
            contentList: contentList
        },
    };
};

export default function SiteMapIndex(props: SiteMapProps) {
    return (
        <PageWrapper>
            <main style={{padding: "2em"}}>
                <UnderConstructionCard/>
                <h1>Site map</h1>
                <h2>Main pages</h2>
                <p><a href={"/"}>Home</a></p>
                <p><a href={"/about"}>About</a></p>
                <p><a href={"/blogs"}>Blogs</a></p>
                <p><a href={"/creations"}>Creations</a></p>
                <p><a href={"/site-map"}>Site Map (you are here!)</a></p>
            </main>
        </PageWrapper>
    );
}
