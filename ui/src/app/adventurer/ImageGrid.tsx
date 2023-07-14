import BlurImage from "./imageloader"
import { Images } from "./page"

export const ImageGrid = ({ images }: Images) => {
    return (
        <div className="grid grid-cols-8">
            {images.map((a, index) =>
                <div key={index}><BlurImage src={a.url} alt="" /></div>
            )}
        </div>
    )
}