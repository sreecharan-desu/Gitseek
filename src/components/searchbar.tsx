import { SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useRecoilState } from "recoil";
import { usersAtom } from "../store";

// const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

export default function Search() {
    const [delim, setDelim] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useRecoilState(usersAtom);
    const [totalCount, setCount] = useState(0);

    const onChangeHandler = (event: { target: { value: SetStateAction<string> } }) => {
        setDelim(event.target.value);
    };

    const debouncedValue = useDebounce(delim, 500);

    const fetchUsers = async (username: string) => {
        if (!username) return;

        setLoading(true);
        try {
            const res = await fetch(`https://api.github.com/search/users?q=${username}`);

            if (!res.ok) {
                const errorData = await res.json();
                console.error("GitHub API Error:", errorData);
                return;
            }

            const data = await res.json();
            setUsers(data.items || []);
            setCount(data.total_count || 0);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedValue) {
            fetchUsers(debouncedValue);
        }
    }, [debouncedValue]);

    const onClickHandler = () => {
        fetchUsers(debouncedValue);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            {/* Search Bar */}
            <div className="relative w-full max-w-xl">
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={delim}
                    className="w-full bg-[#161b22] text-white px-5 py-3 rounded-lg text-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none shadow-md"
                    placeholder="🔍 Search GitHub users..."
                />
                <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-full shadow-md"
                    onClick={onClickHandler}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <div className="mt-6 flex flex-col items-center space-y-4">
                    <div className="w-64 h-6 bg-gray-700 animate-pulse rounded-md"></div>
                    <div className="w-48 h-6 bg-gray-700 animate-pulse rounded-md"></div>
                </div>
            ) : users && users.length === 0 && debouncedValue ? (
                <p className="mt-6 text-gray-300 text-lg text-center">
                    No users found for <b className="bg-gray-800 px-3 py-1 rounded-md">"{debouncedValue}"</b>
                </p>
            ) : (
                users.length > 0 && (
                    <p className="mt-6 text-gray-300 text-lg text-center">
                        Found <span className="text-blue-400 font-bold">{totalCount}</span> users matching{" "}
                        <b className="bg-gray-800 px-3 py-1 rounded-md">"{debouncedValue}"</b>
                    </p>
                )
            )}
        </div>
    );
}
