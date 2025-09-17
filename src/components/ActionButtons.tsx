import { type FC } from "react";
import { FiEdit3, FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface ActionButtonsProps {
    id: string | number;
    onView?: (id: string | number, row: any) => void;
    onEdit?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
    iconSize?: number;
    className?: string;
    row: any;
}

const ActionButtons: FC<ActionButtonsProps> = ({
    id,
    onView,
    onEdit,
    onDelete,
    iconSize = 16,
    className = "",
    row
}) => {
    if (!onView && !onEdit && !onDelete) return null;

    const buttonBaseClasses =
        "p-2 rounded-md flex items-center justify-center transition-transform duration-200 hover:scale-110";

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {onView && (
                <button
                    onClick={() => onView(id, row)}
                    title="View"
                    className={`${buttonBaseClasses} bg-[#468181] text-white hover:brightness-110`}
                >
                    <FiEye fontSize={iconSize} />
                </button>
            )}
            {onEdit && (
                <button
                    onClick={() => onEdit(id)}
                    title="Edit"
                    className={`${buttonBaseClasses} bg-[#468181] text-white hover:brightness-110`}
                >
                    <FiEdit3 fontSize={iconSize} />
                </button>
            )}
            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    title="Delete"
                    className={`${buttonBaseClasses} bg-[#468181] text-white hover:brightness-110`}
                >
                    <RiDeleteBinLine fontSize={iconSize} />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
