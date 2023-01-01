import {Content} from "turnip_api/ts/rpc/turnip/service";
import {Card, CardActionArea, CardContent} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import {NextRouter} from "next/router";

export interface ContentCardProps {
    content: Content;
    router: NextRouter;
    setContentListProp?: Dispatch<SetStateAction<Content[]>>
}

export const ContentCard = (props: ContentCardProps) => {
    const {content, router} = props;

    return <Card variant="outlined" key={content.primaryId}>
        <CardActionArea onClick={() => {
            props.setContentListProp?.([content]);
            void router.push(`/admin/contents/${content.primaryId}`);
        }}>
            <CardContent>
                <>
                    <h1>{content.title}</h1><br/>
                    <h2>Content</h2>
                    {content.content}
                    <br/><br/>
                    <h2>Tags</h2>
                    <ul>
                        {content.tagList.map((tag) => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul>
                    <br/>
                    <h2>AccessDetails</h2>
                    {content.accessDetails}
                    <br/>
                    <h2>Metadata</h2>
                    <ul>
                        <li>Author ID: {content.authorId}</li>
                        <li>Primary ID: {content.primaryId}</li>
                        <li>Description: {content.description}</li>
                        {/*todo: content.meta here!!*/}
                    </ul>
                </>
            </CardContent>
        </CardActionArea>
    </Card>
}