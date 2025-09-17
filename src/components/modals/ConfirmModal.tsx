import React from "react";
import Modal from "./Modal";
import Button from "@components/ui/Button";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Yes, Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
}) => {
    return (
        <Modal open={open} onClose={onCancel} width="max-w-sm">
            <div className="space-y-4 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600">
                        <FiAlertTriangle size={32} />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>

                {/* Actions */}
                <div className="flex justify-center gap-3 pt-2">
                    <Button
                        text={cancelText}
                        onClick={onCancel}
                        className="min-w-[100px]"
                    />
                    <Button
                        text={confirmText}
                        onClick={onConfirm}
                        isLoading={isLoading}
                        className="min-w-[120px] bg-red-500 hover:bg-red-600 text-white"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
