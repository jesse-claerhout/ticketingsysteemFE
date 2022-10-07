import { Button } from "@mui/material";
import { useState } from "react";
import TicketService from "../../services/ticket.service";

function UploadImageComponent() {

    const [preSignedUrl, setPreSignedUrl] = useState("");

const onSubmit = () => {
    TicketService.getPreSignedUrlToUpload().then((response) => {
        console.log(response.data)
        setPreSignedUrl(response.data)
    }).catch((error) => {
        console.log("S3 Bucket Error")
    })
}

    return ( 
        <Button variant="contained" onClick={onSubmit}>
            Upload
        </Button>
     );
}

export default UploadImageComponent;