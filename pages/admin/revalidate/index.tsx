import useAuthAdminRedirect from "../../../lib/util/use-auth-admin-redirect";
import {Button, TextField, TextFieldProps} from "@mui/material";
import {useRef, useState} from "react";
import {RevalidateStaticPathRequest} from "turnip_api/ts/rpc/turnip/service";

export default function RevalidateIndex() {
    const {turnipClient, options} = useAuthAdminRedirect();

    const pathRef = useRef<TextFieldProps>();
    const [status, setStatus] = useState<string>("");

    const onClick = () => {
        const reqInput: RevalidateStaticPathRequest = {
            path: pathRef.current?.value as string,
        };
        turnipClient?.revalidateStaticPath(reqInput, options).then((response) => {
            setStatus(response.response.message);
        }).catch(err => {
            setStatus(JSON.stringify(err));
        });
    };

    return (<>
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Revalidate</h1>
            {
                status && <p><b>{status}</b></p>
            }
            <TextField label="path"
                       defaultValue="/"
                       inputRef={pathRef}/>
            <Button onClick={onClick}>Revalidate</Button>
        </div>
    </>);
}