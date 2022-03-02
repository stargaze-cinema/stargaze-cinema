import { useState, useEffect } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'

axios.defaults.baseURL = import.meta.env.APP_API_URL
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Accept'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

const useAxios = (url: string, timeout?: number) => {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unmounted = false
        const source = axios.CancelToken.source()
        axios
            .get(url, {
                cancelToken: source.token,
                timeout: timeout,
            })
            .then((res: AxiosResponse) => {
                if (!unmounted) {
                    setData(res.data)
                    setLoading(false)
                }
            })
            .catch((err: AxiosError) => {
                if (!unmounted) {
                    setError(err.message)
                    setLoading(false)
                    if (axios.isCancel(err)) {
                        console.error(`Request cancelled: ${err.message}`)
                    } else {
                        console.error(`Error happened: ${err.message}`)
                    }
                }
            })
        return () => {
            unmounted = true
            source.cancel('Cancelling in cleanup')
        }
    }, [url, timeout])

    return { data, loading, error }
}

export default useAxios
