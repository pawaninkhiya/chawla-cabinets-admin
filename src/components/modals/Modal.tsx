import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    closeOnOutsideClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    width = "max-w-md",
    closeOnOutsideClick = true,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") onClose();
            };

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    closeOnOutsideClick &&
                    modalRef.current &&
                    !modalRef.current.contains(event.target as Node)
                ) {
                    onClose();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.body.classList.remove("overflow-hidden");
                window.removeEventListener("keydown", handleKeyDown);
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [open, onClose, closeOnOutsideClick]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-gray-900/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        className={`bg-white dark:bg-gray-900 shadow-2xl p-6 rounded-md relative w-[90%] ${width}`}
                        initial={{ y: 40, scale: 0.95, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 40, scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
