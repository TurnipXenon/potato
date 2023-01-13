import {Card} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

export interface UnderConstructionCardProps {
    optionalMessage?: string;
    sx?: SxProps<Theme>;
}

export const UnderConstructionCard = (props: UnderConstructionCardProps) => {
    const defaultStyles: SxProps<Theme> = {
        textAlign: "Center",
        padding: "2em",
        margin: "2em"
    };
    let defaultProps = defaultStyles;

    if (props.sx) {
        defaultProps = Object.assign({}, defaultStyles, props.sx);
    }

    return <Card sx={defaultProps}>
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
