import { useEffect, useState } from "react";

interface useLocalApiProps {
    promise():Promise<any>
};

export function useLocalApi<T>(props: useLocalApiProps) {
    const {promise } = props;

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setData(await promise())
            setIsLoading(false)
        }
        )()
    }, [])

    return { data, isLoading }
}