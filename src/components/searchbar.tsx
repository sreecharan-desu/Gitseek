import { SetStateAction,useEffect,useState } from "react"
import { useDebounce } from "../hooks/useDebounce";
import { useRecoilState } from "recoil";
import { usersAtom } from "../store";

export default function Search(){
    const [delim,setDelim] = useState('');const [loading,setLoading] = useState(false);
    const [users,setUsers] = useRecoilState(usersAtom);
    const [totalCount,setCount] = useState(0);
    const onChangeHandler = (event: { target: { value: SetStateAction<string>; }; })=>{
        setDelim(event.target.value);
    }
    const debouncedValue = useDebounce(delim,500);
    useEffect(()=>{
        const getUsers = async (username:string)=>{
            setLoading(true);
            const res = await fetch(`https://api.github.com/search/users?q=${username}`,{
                method : 'GET'
            });
            const data = await res.json();
            console.log(data);
            setUsers(data.items);
            setCount(data.total_count);
            setLoading(false);
        }
        getUsers(debouncedValue);
    },[debouncedValue, setUsers])

    const onClickHandler= async()=>{
        setLoading(true);
        const res = await fetch(`https://api.github.com/search/users?q=${debouncedValue}`,{
            method : 'GET'
        });
        const data = await res.json();
        console.log(data);
        setUsers(data.items);
        setCount(data.total_count);
        setLoading(false);
    }

    return<>
    <div className="flex-col justify-center">
    <div className="m-3 flex justify-between text-left">
            <input type="text" onChange={onChangeHandler} className="w-full px-20 py-1 lg:py-1 lg:pr-40 pl-3 rounded-xl text-xl" placeholder="Search by username"/>
            <button className="bg-white m-1 rounded-xl hover:shadow-lg hover:bg-slate-500 transition-all  px-2 py-2" onClick={onClickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover:text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
        {
        (!users) ?<>
            {loading ?<>
                Loading...
            </> : <>
                
            </>}
        </> : 
        <>
        {loading ? 
        <>
            Loading...
        </> : 
        <>
            <p className="m-3 text-white text-center">
                Found {totalCount} results matching <b className="bg-slate-900 rounded-md p-1">`{debouncedValue}`</b>
            </p>
        </>}

        </>}
    </div>
    </>
}