import { useState, useEffect } from 'react'
import axios, { AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios'

interface UseAxios {
    (config: {
        url: string
        data?: object
        method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
        headers?: AxiosRequestHeaders
    }): {
        data: any
        loading: boolean
        error: string
    }
}

const useAxios: UseAxios = config => {
    const [data, setData] = useState<object>({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unmounted = false
        const source = axios.CancelToken.source()
        axios({
            ...config,
            cancelToken: source.token,
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { data, loading, error }
}

export default useAxios
