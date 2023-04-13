import { useEffect, useState } from "react"
// import { client } from "../api/client";

const useFetch = <T extends unknown>(url: string) => {

    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const fetchi = async () => {
        const res = await fetch(url);
        return res;
    }
    
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const data = await fetchi();
                // setData(data);
            }
            catch (e: any) {
                setError(e)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [url]);

    return { data, loading, error } as const;
}
export default useFetch;