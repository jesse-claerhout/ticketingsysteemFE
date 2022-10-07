import interceptors from "./interceptors";

const UploadImagesToS3 = (files: FormData, onUploadProgress?: ((ProgressEvent: any) => void)) => {
    
    return interceptors.post("/aws-s3", files, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
}

const AwsS3Service = {
    UploadImagesToS3,
}

export default AwsS3Service;