import { type FC } from "react";
import Button from "@components/ui/Button";
import SearchInput from "@components/ui/SearchInput";
import { IoAdd } from "react-icons/io5";

interface ModelsHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    onNew: () => void;
}

const ModelsHeader: FC<ModelsHeaderProps> = ({ search, setSearch, onNew }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow p-4 rounded-md border border-gray-100">
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories"
                width="w-full md:max-w-xs"
            />
            <Button text=" Add Model" icon={<IoAdd size={22} />} onClick={onNew} />
        </div>
    );
};

export default ModelsHeader;
