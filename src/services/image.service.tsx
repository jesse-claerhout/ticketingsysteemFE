import interceptors from "./interceptors";

const postImage = (fileNames: string[], ticketId: number) => {
     return interceptors.post("/images", {"fileNames": fileNames, "ticketId": ticketId})
}

const getImageURLs = (id: string | undefined) => {
    return interceptors.get(`/images/${id}`);
}

const ImageService = {
    postImage,
    getImageURLs
}

export default ImageService;