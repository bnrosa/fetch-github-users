import React, { useState, useRef, useEffect } from "react";
import useSWR from "swr";

type GithubResponse = {
    incomplete_results: boolean,
    items: any[],
    total_count: number
}
const Home = () => {
    const fetcher = (input: string ) => fetch("https://api.github.com/search/users?q="+input).then(res => res.json());
    
    const [searchInput, setSearchInput] = useState("");
    const inputEl = useRef<HTMLInputElement>(null);
    const { data, error } = useSWR<GithubResponse, any>(searchInput ?
        searchInput : null,
        fetcher
    );
    useEffect(() => {
        if(data){
            console.log(data)
        }
    }, [data]);
    return (
        <main>
        <header>Github Users</header>
        <section>
            <input placeholder="user-search" name="input"
                ref={inputEl}
            />
            <button onClick={() => setSearchInput(inputEl?.current?.value || "")} type="submit">Search</button>
            {data && data.items.map(item => {
                return <span>{item.login}</span>
            })}
        </section>
        </main>
        
    )
}

export default Home;