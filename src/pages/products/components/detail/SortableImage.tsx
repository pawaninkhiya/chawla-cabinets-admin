import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical } from 'react-icons/fa';

interface SortableImageProps {
    img: string;
    index: number;
    colorName: string;
}

const SortableImage: React.FC<SortableImageProps> = ({ img, index, colorName }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="border border-gray-200 rounded-lg overflow-hidden relative bg-white shadow-sm"
        >
            <div className="h-48 w-48 bg-gray-100 flex items-center justify-center p-4">
                <img src={img} alt={`${colorName} ${index + 1}`} className="object-contain h-full w-full" />
            </div>
            <div {...attributes} {...listeners} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md cursor-grab active:cursor-grabbing">
                <FaGripVertical size={14} className="text-gray-600" />
            </div>
        </div>
    );
};

export default SortableImage;
