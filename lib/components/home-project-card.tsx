import styles from "../../pages/HomeIndex.module.css";
import React from "react";
import ReactMarkdown from "react-markdown";
import {GameProjectProps, getProjectLinkAltText} from "../models/game-project-props";

export interface HomeProjectCardProps {
    content: GameProjectProps;
}

export const HomeProjectCard = (props: HomeProjectCardProps) => {
    return (<section className={styles.majorSection}>
        <video playsInline autoPlay muted loop className="content-header" id="header-pengi">
            {props.content.videoList.map((value) => {
                return <source key={value.src} src={value.src} type={value.type}/>;
            })}
            Your browser does not support the video tag.
        </video>

        <div className="content-padded">

            <h2>{props.content.title}</h2>
            <time>{props.content.timeline}</time>
            <br/>
            {props.content.tagline && <q>{props.content.tagline}</q>}

            <ReactMarkdown>
                {props.content.content}
            </ReactMarkdown>

            <section className="links">
                {props.content.linkList.map((value, index) => {
                    return (<input type="image" src={value.externalBadge.imageLink}
                                   key={value.link}
                                   id="itch-pengi"
                                   className="tx-badge" title={value.link}
                                   alt={getProjectLinkAltText(value, props.content)}/>);
                })}
            </section>

        </div>

    </section>);
};