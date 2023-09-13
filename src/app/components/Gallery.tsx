import fetchImages from "@/lib/fetchImages";
import addBlurredDataUrl from "@/lib/getBase64";
import type { ImageResult } from "@/models/Images";
import ImgContainer from "./ImgContainer";

interface GalleryProps {
    topic?: string | undefined;
}

const Gallery = async ({ topic }: GalleryProps) => {
    const url = !topic
        ? "https://api.pexels.com/v1/curated"
        : `https://api.pexels.com/v1/search?query=${topic}`;
    const images: ImageResult | undefined = await fetchImages(url);
    if (!images)
        return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
    const photosWithBlur = await addBlurredDataUrl(images);
    return (
        <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
            {photosWithBlur.map((photo) => (
                <ImgContainer key={photo.id} photo={photo} />
            ))}
        </section>
    );
};

export default Gallery;
