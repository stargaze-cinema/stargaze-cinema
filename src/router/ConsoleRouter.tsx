import { Route } from '@tanstack/react-location'
import { RequireAnon } from '@/providers/AuthProvider'
import { AdminLayout } from '@/components/Layouts/AdminLayout'
import { HelmetProvider } from '@/providers/HelmetProvider'

interface Router {
    layout: JSX.Element
    routes: Route[]
}

export const consoleRouter: Router = {
    layout: <AdminLayout />,
    routes: [
        {
            path: '/',
            element: () =>
                import('@/pages/console/ConsolePage').then(module => <module.ConsolePage />),
        },
        {
            path: 'movies',
            element: () =>
                import('@/pages/console/ConsoleMoviesPage').then(module => (
                    <HelmetProvider title="Movies" console>
                        <module.ConsoleMoviesPage />
                    </HelmetProvider>
                )),
        },
        {
            path: 'signin',
            element: () =>
                import('@/pages/SignInPage').then(module => (
                    <RequireAnon>
                        <HelmetProvider title="Sign in" console>
                            <module.SignInPage />
                        </HelmetProvider>
                    </RequireAnon>
                )),
        },
        {
            path: '*',
            element: () =>
                import('@/pages/console/ConsolePage').then(module => <module.ConsolePage />),
        },
    ],
}
