import {Button, List, ListItem, TextField, TextFieldProps} from "@mui/material";
import React, {useRef, useState} from "react";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {useAppContext} from "../util/app-context";
import {useRouter} from "next/router";
import {fromPairArrayToStringMap, fromStringMapToPairArray, Pair} from "../util/pair";

export enum ContentEditAction {
    Update,
    Create
}

export interface ContentEditProps {
    content: Content;
    action?: ContentEditAction;
}


export const ContentEdit = (props: ContentEditProps) => {
    // todo: client side validation
    const {turnipClient, options} = useAppContext();
    const {content} = props;
    const titleRef = useRef<TextFieldProps>();
    const contentRef = useRef<TextFieldProps>();
    const descriptionRef = useRef<TextFieldProps>();
    const [tagList, setTagList] = useState<string[]>(content.tagList);
    const [metaList, setMetaList] = useState<Pair<string, string>[]>(
        fromStringMapToPairArray(content.meta));
    const router = useRouter();

    const updateContent = () => {
        // todo: debouncing
        const newContent: Content = {
            title: titleRef.current?.value as string,
            description: descriptionRef.current?.value as string,
            content: contentRef.current?.value as string,
            tagList: tagList,
            meta: fromPairArrayToStringMap(metaList),
            primaryId: content.primaryId,
            authorId: content.authorId,
        };

        const promise = (props.action === ContentEditAction.Create) ?
            turnipClient!.createContent({
                item: newContent
            }, options)
            : turnipClient!.updateContent({
                item: newContent
            }, options);

        promise.then(() => {
            void router.push("/admin/contents/");
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className={"blockAllChildren"}>

            {/*todo: expand text field*/}
            <TextField name="Title"
                       label="Title"
                       variant="outlined"
                       defaultValue={content.title}
                       style={{marginBottom: "1em"}}
                       inputRef={titleRef}
            />
            <TextField
                name="Content"
                label="Content"
                id="outlined-multiline-flexible"
                multiline
                maxRows={10}
                defaultValue={content.content}
                style={{marginBottom: "1em"}}
                inputRef={contentRef}
            />
            <TextField
                id="outlined-multiline-flexible"
                name="Description"
                label="Description"
                multiline
                maxRows={10}
                defaultValue={content.description}
                style={{marginBottom: "1em"}}
                inputRef={descriptionRef}
            />
            <h3>Media (TODO)</h3>
            <h3>Tags</h3>
            <List>
                {tagList.map((value, index) => {
                    return (<ListItem key={value}>
                        <Button onClick={() => {
                            tagList.splice(index);
                            setTagList([...tagList]);
                        }}>-</Button>
                        <TextField
                            label="tag"
                            defaultValue={value}
                            onChange={(newValue) => {
                                tagList[index] = newValue.target.value;
                            }}></TextField>
                    </ListItem>);
                })}
                <ListItem><Button onClick={() => {
                    tagList.push("");
                    setTagList([...tagList]);
                }}>+</Button> Create new tag</ListItem>
            </List>
            <br/>
            <h3>Access Details (TODO)</h3>
            <h3>Metadata</h3>
            <List>
                {metaList.map((value, index) => {
                    return <ListItem key={value.key}>
                        <Button onClick={() => {
                            metaList.splice(index);
                            setMetaList([...metaList]);
                        }}>-</Button>
                        <TextField
                            label="key"
                            defaultValue={value.key}
                            onChange={(newValue) => {
                                metaList[index].key = newValue.target.value;
                            }}></TextField>
                        <TextField
                            label="value"
                            defaultValue={value.value}
                            onChange={(newValue) => {
                                metaList[index].value = newValue.target.value;
                            }}></TextField>
                    </ListItem>;
                })}
                <ListItem><Button onClick={() => {
                    metaList.push({
                        key: "",
                        value: ""
                    });
                    setMetaList([...metaList]);
                }}>+</Button> Create new tag</ListItem>
            </List>
            <Button variant="outlined" onClick={updateContent}>Save</Button>
        </div>
    );
};
