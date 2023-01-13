import {Card} from "@mui/material";

export interface UnderConstructionCardProps {
    optionalMessage?: string;
}

export const UnderConstructionCard = (props: UnderConstructionCardProps) => {
    return <Card sx={{
        textAlign: "Center",
        padding: "2em",
        margin: "2em"
    }}>
        <h1>⚠CONSTRUCTION⚠</h1>

        <p>We are currently under the process of making this webpage. Thank you for your patience. 🙇‍♂️</p>

        {
            props.optionalMessage &&
            <p>{props.optionalMessage}</p>
        }

        <video playsInline={true} autoPlay={true} loop={true} muted={true}>
            <source
                src="https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4"
                type="video/mp4"/>
        </video>
    </Card>;
};
