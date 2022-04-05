import { Route } from '@tanstack/react-location'
import { RequireAdmin, RequireAnon } from '@/providers/AuthProvider'
import { AdminLayout } from '@/components/Layouts/AdminLayout'
import { HelmetProvider } from '@/providers/HelmetProvider'

interface Router {
    layout: JSX.Element
    routes: Route[]
}

export const consoleRouter: Router = {
    layout: (
        <RequireAdmin>
            <AdminLayout />
        </RequireAdmin>
    ),
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
            path: 'signup',
            element: () =>
                import('@/pages/SignUpPage').then(module => (
                    <RequireAnon>
                        <HelmetProvider title="Sign up" console>
                            <module.SignUpPage />
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
