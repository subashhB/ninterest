"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Search = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/results/${search}`);
        setSearch("");
    };
    return (
        <form
            className="flex justify-center md:justify-between"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-white p-2 w-[260px] text-xl rounded-xl text-black "
            />
        </form>
    );
};

export default Search;
