import { useEffect, useState } from "react"

export const useDebounce = (delim:string,timer : number)=>{
    const [debounce,setDebounce] = useState('');
    useEffect(()=>{
        const timeId = setTimeout(()=>{
            setDebounce(delim);
        },timer)
        return ()=>{
            clearTimeout(timeId);
        }
    },[delim, timer])
    return debounce;
}