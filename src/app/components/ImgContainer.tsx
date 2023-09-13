import { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

interface ImgContainerProps {
    photo: Photo;
}

const ImgContainer = ({ photo }: ImgContainerProps) => {
    const widthHeightRatio = photo.height / photo.width;
    const galleryHeight = Math.ceil(250 * widthHeightRatio);
    const photoSpans = Math.ceil(galleryHeight / 10) + 1;

    return (
        <div
            className="w-[250px] justify-self-center"
            style={{ gridRow: `span ${photoSpans}` }}
        >
            <Link
                href={photo.url}
                className="grid place-content-center"
                target="_blank"
            >
                <div className="rounded-xl overflow-hidden group">
                    <Image
                        width={250}
                        height={photo.height}
                        src={photo.src.large}
                        alt={photo.alt}
                        sizes="250px"
                        className="group-hover:opacity-75"
                        placeholder="blur"
                        blurDataURL={photo.blurredDataUrl}
                    />
                </div>
            </Link>
        </div>
    );
};

export default ImgContainer;
