import {UnderConstructionCard} from "../../lib/components/under-construction-card";
import {GetStaticProps} from "next";
import {createServerSideClient} from "../../lib/util/create-server-side-client";
import {PageMetaProps} from "../index";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {Card} from "@mui/material";
import ReactMarkdown from "react-markdown";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {PageWrapper} from "../../lib/components/page-wrapper";

export interface AboutIndexProps {
    pageMeta: PageMetaProps;
}

export const getStaticProps: GetStaticProps<AboutIndexProps> = async () => {
    const {turnipClient, options, hostCode} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "home", "page-meta"]
    }, options).response;

    // todo response.itemList: Content -> GameProjectProp
    const pageMeta: PageMetaProps = {
        about: "",
        header: "",
        social: "",
        aboutLite: "",
    };
    for (const content of response.itemList) {
        pageMeta.about = content.meta['about'] ?? "";
        pageMeta.aboutLite = content.meta['about-lite'] ?? "";
        pageMeta.header = content.meta['header'] ?? "";
        pageMeta.social = content.meta['social'] ?? "";
        break;
    }

    return {
        props: {
            pageMeta: pageMeta,
        },
    };
};


export default function AboutIndex(props: AboutIndexProps) {
    const defaultStyle: SxProps<Theme> = {
        textAlign: "center",
        margin: "2em auto",
        padding: "2em",
        width: "40em"
    };

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
                    props.pageMeta.about &&
                    <Card sx={defaultStyle}>
                        <ReactMarkdown>
                            {props.pageMeta.about}
                        </ReactMarkdown>
                    </Card>
                }

                {
                    props.pageMeta.about &&
                    <Card sx={defaultStyle}>
                        <ReactMarkdown>
                            {props.pageMeta.social}
                        </ReactMarkdown>
                    </Card>
                }
            </main>
        </PageWrapper>
    );
}