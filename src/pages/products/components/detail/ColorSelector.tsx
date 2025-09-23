
interface ColorSelectorProps {
    colors: any[];
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColorIndex, setSelectedColorIndex }) => (
    <div className="flex flex-wrap gap-4 mb-6">
        {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
                <div
                    className={`w-12 h-12 rounded-full border border-gray-300 shadow-sm cursor-pointer ${selectedColorIndex === index ? "ring-2 ring-offset-2 ring-default-500" : ""}`}
                    style={{ backgroundColor: color.body }}
                    title={color.name}
                    onClick={() => setSelectedColorIndex(index)}
                />
                <span className="text-xs mt-1">{color.name}</span>
                <span className={`text-[10px] mt-0.5 ${color.available ? "text-green-600" : "text-red-500"}`}>
                    {color.available ? "Available" : "Not Available"}
                </span>
            </div>
        ))}
    </div>
);

export default ColorSelector;
