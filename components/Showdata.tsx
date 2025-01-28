"use client";

import { useEffect, useState } from "react";
import { getDataFromapi } from "@/app/action/getData";
import Loading from "@/app/loading";

const Showdata = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const dat = await getDataFromapi();
            setData(dat);
            setLoading(false);
        }
        getData();
    }, []);

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            {data.map((user: any) => (
                <div key={user.login.uuid}>
                    <img src={user.picture.large} alt={user.name.first} />
                    <p>{user.name.first} {user.name.last}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            ))}
        </>
    );
};

export default Showdata;
