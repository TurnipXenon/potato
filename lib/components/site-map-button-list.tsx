import {SiteMapButtonComponent, SiteMapButtonProps} from "./site-map-button-component";
import React from "react";

export interface SiteMapButtonTrayProps {
    shouldHaveText?: boolean;
}

export const SiteMapButtonList = (props: SiteMapButtonTrayProps) => {
    // todo: cache?
    const siteMapElements: SiteMapButtonProps[] = [
        {text: "About + social", link: "/about/"},
        {text: "Blogs", link: "/blogs/"},
        {text: "Stuff I made", link: "/creations/"},
        {text: "Site map", link: "/site-map/"},
    ];

    return <>
        {
            siteMapElements.map((value) => {
                return <SiteMapButtonComponent key={value.text} shouldHaveText={props.shouldHaveText} {...value}/>;
            })
        }
    </>;
};