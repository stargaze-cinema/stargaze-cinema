import { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { ConsoleRouter } from './ConsoleRouter'

export const Router: React.FC = () => {
    const subdomain = useMemo(() => {
        const subdomains = window.location.host.split('.')
        const currentSubdomain = subdomains[0] === 'www' ? subdomains[1] : subdomains[0]

        switch (currentSubdomain) {
            case 'console':
                return 'console'
            default:
                return null
        }
    }, [])

    return (
        <BrowserRouter>
            {!subdomain && <AppRouter />}
            {subdomain === 'console' && <ConsoleRouter />}
        </BrowserRouter>
    )
}
