import fetchImages from "@/lib/fetchImages";
import addBlurredDataUrl from "@/lib/getBase64";
import type { ImageResult } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import getPrevNextPage from "@/lib/getPrevNextPages";
import Footer from "./Footer";

interface GalleryProps {
    topic?: string | undefined;
    page?: string | undefined;
}

const Gallery = async ({ topic = "curated", page }: GalleryProps) => {
    let url: string;
    if (topic === "curated" && page) {
        //For browsing beyond homepage
        url = `https://api.pexels.com/v1/curated?page=${page}`;
    } else if (topic === "curated") {
        //Home
        url = "https://api.pexels.com/v1/curated";
    } else if (!page) {
        //1st page of the search result
        url = `https://api.pexels.com/v1/search?query=${topic}`;
    } else {
        // Seach results beyond search page
        url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
    }

    const images: ImageResult | undefined = await fetchImages(url);

    if (!images || images.per_page === 0)
        return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

    const photosWithBlur = await addBlurredDataUrl(images);
    const { prevPage, nextPage } = getPrevNextPage(images);
    const footerProps = { topic, page, nextPage, prevPage };
    return (
        <>
            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
                {photosWithBlur.map((photo) => (
                    <ImgContainer key={photo.id} photo={photo} />
                ))}
            </section>
            {/* Add Footer */}
            <Footer {...footerProps} />
        </>
    );
};

export default Gallery;
