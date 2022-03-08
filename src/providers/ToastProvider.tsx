import { useState, createContext, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { AxiosError, AxiosResponse } from 'axios'
import { Loading, Success, Warning } from '@/assets/icons/Misc'
import style from '@/styles/toast.module.scss'

const ProviderContext = createContext<Toast>(null!)
export const useToast = () => useContext(ProviderContext)

interface ToastPromise {
    promise: Promise<AxiosResponse<any, any>>
    title?: string
    onSuccess?: (res: AxiosResponse) => void
    onError?: (err: AxiosError) => void
}

interface Toast {
    toastPromise: (params: ToastPromise) => void
    toastSuccess: (title?: string) => void
    toastError: (title?: string) => void
    toastClear: () => void
}

const ToastProvider = ({ children }: { children: JSX.Element }) => {
    const [rendered, setRendered] = useState(false)
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState<any>(null)
    const ref = useRef<HTMLDivElement>(null)

    const toastPromise = ({ promise, title, onSuccess, onError }: ToastPromise) => {
        setTitle(title ? title : 'Processing...')
        setIcon(<Loading className={style.spinAnimation} />)
        setRendered(true)
        promise
            .then((res: AxiosResponse) => {
                setIcon(<Success />)
                setTitle(res.data.message ? res.data.message : 'Success')
                setTimeout(toastClear, 5000)
                onSuccess && onSuccess(res)
            })
            .catch((err: AxiosError) => {
                const responseMsg = err.response?.data.message
                const msg = Array.isArray(responseMsg)
                    ? () => {
                          let mergedMsg = ''
                          responseMsg.forEach((object: any) => {
                              for (const key in object) {
                                  const value = object[key]
                                  mergedMsg = `${mergedMsg}\n${key}:${value}`
                              }
                          })
                          return mergedMsg.trim()
                      }
                    : responseMsg
                setIcon(<Warning />)
                setTitle(msg)
                setTimeout(toastClear, 5000)
                onError && onError(err)
            })
    }

    const toastSuccess = (title?: string) => {
        title && setTitle(title)
        setIcon(<Success />)
        setRendered(true)
        setTimeout(toastClear, 5000)
    }

    const toastError = (title?: string) => {
        title && setTitle(title)
        setIcon(<Warning />)
        setRendered(true)
        setTimeout(toastClear, 5000)
    }

    const toastClear = () => {
        if (!ref.current) return
        ref.current.className = `${style.toast} ${style.popDownAnimation}`
        ref.current.onanimationend = () => setRendered(false)
    }

    return (
        <>
            <ProviderContext.Provider
                value={{
                    toastPromise,
                    toastSuccess,
                    toastError,
                    toastClear,
                }}
            >
                {children}
            </ProviderContext.Provider>
            {createPortal(
                rendered && (
                    <div className={style.toastContainer}>
                        <div className={style.toast} ref={ref}>
                            {icon}
                            <span>{title}</span>
                        </div>
                    </div>
                ),
                document.getElementById('root') as Element
            )}
        </>
    )
}

export default ToastProvider
