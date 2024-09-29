import { useRecoilValue } from "recoil";
import Search from "./searchbar";
import { usersAtom } from "../store";
import React, { Suspense } from "react";
const UserCard = React.lazy(()=>import('./userCard'));
export default function Main(){
    const users = useRecoilValue(usersAtom);
    return<>
        <div className="m-2 flex-col justify-center rounded-md">
            <Search/>
            <div className="lg:grid lg:grid-cols-3">
                {users ? users.map((user)=>{
                    return<>
                        <Suspense fallback={<>Loading...</>}><UserCard user = {user}/></Suspense>   
                    </>
                }) : ''}
            </div>
        </div>
    </>
}