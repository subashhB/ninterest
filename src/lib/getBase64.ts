import { ImageResult, Photo } from "@/models/Images";
import { getPlaiceholder } from "plaiceholder";

async function getBase64(imageUrl: string) {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch image: ${response.status} ${response.statusText}`
            );
        }
        const buffer = await response.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        // console.log(base64);
        return base64;
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.stack);
        }
    }
}

export default async function addBlurredDataUrl(
    images: ImageResult
): Promise<Photo[]> {
    // Making all request at once instead of waiting each one avoiding a waterfall
    const base64Promises = images.photos.map((photo) =>
        getBase64(photo.src.large)
    );

    // Resolve all requests in order
    const base64Results = await Promise.all(base64Promises);

    const photosWithBlur: Photo[] = images.photos.map((photo, i) => {
        photo.blurredDataUrl = base64Results[i];
        return photo;
    });

    return photosWithBlur;
}
