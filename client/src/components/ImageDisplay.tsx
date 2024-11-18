// src/components/ImageDisplay.tsx
interface ImageDisplayProps {
    title: string;
    base64Image: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, base64Image }) => (
    <div className="mb-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <img src={`data:image/png;base64,${base64Image}`} alt={title} className="rounded-lg" />
    </div>
);

export default ImageDisplay;
