import { ImageResult, ImageSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
    url: string
): Promise<ImageResult | undefined> {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: env.PEXELS_API_KEY,
            },
        });
        if (!response.ok) throw new Error("Fetch Images Error\n");
        const imagesResult: ImageResult = await response.json();
        // ! This will show in terminal window not in browser console as it is console of a function.
        // console.log(imagesResult);

        // Parse response data with Zod
        const parsedData = ImageSchemaWithPhotos.parse(imagesResult);
        if (parsedData.total_results === 0) return undefined;
        return parsedData;
    } catch (e) {
        // Will show in terminal console
        if (e instanceof Error) {
            console.error(e.stack);
        }
    }
}
