import {SiteMapButtonList} from "./site-map-button-list";

export interface PageWrapperProps {
    children: JSX.Element;
}

export const PageWrapper = ({children}: PageWrapperProps) => {
    return <div>
        {children}
        <div style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            display: "flex",
            flexDirection: "column"
        }}>
            <SiteMapButtonList/>
        </div>
    </div>;
};
