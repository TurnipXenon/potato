import {Content} from "turnip_api/ts/rpc/turnip/service";

export interface ExternalBadge {
    siteName: string;
    imageLink: string;
}

export interface ProjectLink {
    externalBadge: ExternalBadge;
    link: string;
    altText: string;
}

export interface ProjectVideo {
    src: string;
    type: string;
}

export interface GameProjectProps {
    title: string;
    description: string;
    content: string;
    videoList: ProjectVideo[];
    tagline?: string;
    timeline: string;
    linkList: ProjectLink[];
}

export const itchBadge: ExternalBadge = {
    siteName: "itch.io",
    imageLink: "https://static.itch.io/images/badge.svg"
};
export const githubBadge: ExternalBadge = {
    siteName: "github.com",
    imageLink: "/github-logo.png"
};
export const bitbucketBadge: ExternalBadge = {
    siteName: "bitbucket.org",
    imageLink: "/bitbucket-logo.png"
};
export const badgeMap: { [key: string]: ExternalBadge } = {
    "itchBadge": itchBadge,
    "githubBadge": githubBadge,
    "bitbucketBadge": bitbucketBadge,
};

export const getProjectLinkAltText = (projectLink: ProjectLink, project?: GameProjectProps): string => {
    if (projectLink.altText) {
        return projectLink.altText;
    }

    if (project) {
        return `${project.title} ${projectLink.externalBadge.siteName} link`;
    }

    return `${projectLink.externalBadge.siteName} link`;
};

export const fromContentListToGameProjectList = (contentList: Content[]): GameProjectProps[] => {
    const gl: GameProjectProps[] = [];

    for (const content of contentList) {
        const jsonMap = JSON.parse(content.meta["linkList"]);

        // transform linklist
        const linkList: ProjectLink[] = [];
        for (const rawLink of jsonMap) {
            const out = rawLink;
            // todo: might error
            out['externalBadge'] = badgeMap[rawLink['externalBadge']];
            linkList.push(out);
        }

        gl.push({
            title: content.title,
            description: content.description,
            content: content.content,
            videoList: JSON.parse(content.meta['videoList']),
            tagline: content.meta['tagline'],
            timeline: content.meta['timeline'],
            linkList: linkList,
        });
    }

    return gl;
};
