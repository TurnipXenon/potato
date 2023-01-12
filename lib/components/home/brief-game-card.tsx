import {Card, CardContent} from "@mui/material";
import Image from "next/image";
import aresImage from "../../../public/ares.jpg";
import React, {useState} from "react";
import {GameProjectProps, getProjectLinkAltText} from "../../models/game-project-props";

export interface BriefGameCardProps {
    project: GameProjectProps,
}

export const BriefGameCard = (props: BriefGameCardProps) => {
    const [deg] = useState<number>((Math.random() * 6) - 3);

    return (
        <Card style={{
            display: "inline-block",
            borderRadius: "2em",
            backgroundColor: "var(--reinhard-main-medium)",
            width: "32em",
            margin: "2em",
            transform: `rotate(${deg}deg)`
        }}>
            <CardContent style={{
                padding: "0"
            }}>
                <div style={{height: "2em"}}></div>
                <article>
                    <div style={{
                        display: "flex",
                        backgroundColor: "var(--reinhard-main-dark)",
                        padding: "1em"
                    }}>
                        <div>
                            <Image src={aresImage} alt="Ares from Rune Factory 5" style={{
                                border: "0.5em solid var(--reinhard-bg)",
                                borderRadius: "2em",
                                width: "10em",
                                height: "10em",
                                zIndex: 10
                            }}/>
                            {/*    todo image here*/}
                        </div>
                        <div style={{
                            textAlign: "start",
                            padding: "1em"
                        }}>
                            <div
                                style={{
                                    backgroundColor: "var(--reinhard-main-light)",
                                    display: "inline-block",
                                    borderRadius: "0.75em"
                                }}>
                                <h1 style={{
                                    margin: "0.25em 0.5em"
                                }}>{props.project.title}</h1>
                            </div>
                            <p>{props.project.tagline}</p>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        padding: "1em"
                    }}>
                        {
                            props.project.linkList.map((value, index) => {
                                const link = value.link.includes("https://") ? value.link : `https://${value.link}`;
                                return <div key={value.link} style={{
                                    margin: "0.5em"
                                }}>
                                    <a href={link}>
                                        <img
                                            src={value.externalBadge.imageLink}
                                            style={{
                                                maxHeight: "3em"
                                            }}
                                            alt={getProjectLinkAltText(value, props.project)}
                                        />
                                    </a>
                                </div>;
                            })
                        }
                    </div>
                </article>
            </CardContent>
        </Card>
    );
};