import SearchInput from "@components/ui/SearchInput";
import Button from "@components/ui/Button";
import { IoAdd } from "react-icons/io5";

interface Props {
    search: string;
    setSearch: (val: string) => void;
    onNew: () => void;
}

const CategoriesHeader = ({ search, setSearch, onNew }: Props) => (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow p-4 rounded-md border border-gray-100">
        <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories"
            width="w-full md:max-w-xs"
        />
        <Button text="New" icon={<IoAdd size={22} />} onClick={onNew} />
    </div>
);

export default CategoriesHeader;
