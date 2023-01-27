import {SiteMapButtonComponent, SiteMapButtonProps} from "./site-map-button-component";
import React from "react";
import aboutIcon from "../../public/icons/about-icon.jpg";
import blogsIcon from "../../public/icons/blogs-icon.jpg";
import creationsIcon from "../../public/icons/creations-icon.jpg";
import siteMapIcon from "../../public/icons/site-map-icon.jpg";

export interface SiteMapButtonTrayProps {
    shouldHaveText?: boolean;
    buttonSize?: number;
}

export const SiteMapButtonList = (props: SiteMapButtonTrayProps) => {
    // todo: cache?
    const siteMapElements: SiteMapButtonProps[] = [
        {text: "About and socials", link: "/about/", imgSrc: aboutIcon.src},
        {text: "Blogs", link: "/blogs/", imgSrc: blogsIcon.src},
        {text: "Stuff I made", link: "/creations/", imgSrc: creationsIcon.src},
        {text: "Site map", link: "/site-map/", imgSrc: siteMapIcon.src},
    ];

    return <>
        {
            siteMapElements.map((value) => {
                return <SiteMapButtonComponent
                    key={value.text}
                    shouldHaveText={props.shouldHaveText}
                    buttonSize={props.buttonSize}
                    {...value}/>;
            })
        }
    </>;
};
