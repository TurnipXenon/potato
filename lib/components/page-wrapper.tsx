import {SiteMapButtonList} from "./site-map-button-list";
import {Card} from "@mui/material";

export interface PageWrapperProps {
    children: JSX.Element;
}

export const PageWrapper = ({children}: PageWrapperProps) => {
    return <div>
        {children}
        <Card style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            gap: "0.5em",
            backgroundColor: "var(--reinhard-main-light)",
            borderRadius: "2em 0 0"
        }}>
            <SiteMapButtonList/>
        </Card>
    </div>;
};
