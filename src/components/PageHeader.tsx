import { FaHome, FaBox } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    breadcrumbItems?: { label: string; path?: string; active?: boolean }[];
}

const PageHeader = ({ title, breadcrumbItems }: PageHeaderProps) => {
    return (
        <div className="w-full mb-6 font-primary p-4 md:p-6 rounded-tr-3xl rounded-bl-3xl shadow-sm bg-gradient-to-r from-default-500 to-default-400">
            {/* Title + Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Title with icon */}
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-white/20 flex-shrink-0">
                        <FaBox className="text-white" size={18} />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                        {title}
                    </h1>
                </div>

                {/* Breadcrumb */}
                {breadcrumbItems && (
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-sm text-white/80 mt-3 md:mt-0"
                    >
                        <Link
                            to="/"
                            className="flex items-center gap-1 text-white hover:text-white/70 transition-colors"
                        >
                            <FaHome size={14} />
                        </Link>

                        {breadcrumbItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <MdKeyboardArrowRight className="text-white/50" size={16} />
                                {item.path && !item.active ? (
                                    <Link
                                        to={item.path}
                                        className="text-white hover:text-white/70 transition-colors truncate"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={`${item.active
                                                ? "text-white font-semibold"
                                                : "text-white"
                                            } truncate`}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
