import {UnderConstructionCard} from "../../lib/components/under-construction-card";
import {GetStaticProps} from "next";
import {createServerSideClient} from "../../lib/util/create-server-side-client";
import {Card, CardActionArea} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {useRouter} from "next/router";
import {PageWrapper} from "../../lib/components/page-wrapper";

export interface BlogBlurb {
    title: string,
    description: string,
    blurb: string,
    tagList: string[],
    slug: string,
}

export interface BlogsIndexProps {
    contentList: BlogBlurb[];
}

export const getStaticProps: GetStaticProps<BlogsIndexProps> = async (context) => {
    const {turnipClient, options, hostCode} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "blogs"]
    }, options).response;

    const contentList: BlogBlurb[] = [];
    for (const pbContent of response.itemList) {
        if (pbContent.slug) {
            contentList.push({
                title: pbContent.title,
                description: pbContent.description,
                blurb: pbContent.meta["blurb"] ?? "",
                tagList: pbContent.tagList, // todo sanitize tag list!
                slug: pbContent.slug,
            });
        }
    }

    return {
        props: {
            contentList: contentList
        },
    };
};


export default function BlogsIndex(props: BlogsIndexProps) {
    const defaultStyle: SxProps<Theme> = {
        textAlign: "center",
        margin: "2em auto",
        padding: "2em",
        width: "40em"
    };
    const router = useRouter();

    return (
        <PageWrapper>
            <main style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <UnderConstructionCard sx={defaultStyle}/>
                {
                    props.contentList.map((value) => {
                        return <Card key={value.slug} sx={defaultStyle}>
                            <CardActionArea onClick={() => {
                                void router.push(`/blogs/${value.slug}`);
                            }
                            }>
                                <h1>{value.title}</h1>
                                <p>{value.description}</p>
                                <p>{value.blurb}</p>
                            </CardActionArea>
                        </Card>;
                    })
                }
            </main>
        </PageWrapper>
    );
}