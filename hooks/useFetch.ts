import { useEffect, useState } from "react"

export const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async() => {
    try {
      setIsLoading(true);
      setError(null)
      
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch movies'));
    } finally {
      setIsLoading(false);
    }
  }

  const reset = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  }

  useEffect(() => {
    if(autoFetch) {
      fetchData()
    }
  }, [])

  return { data, isLoading, error, refetch: fetchData, reset }
}

export default useFetch