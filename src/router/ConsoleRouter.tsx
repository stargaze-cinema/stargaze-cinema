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
            path: 'sessions',
            element: () =>
                import('@/pages/console/ConsoleSessionsPage').then(module => (
                    <HelmetProvider title="Sessions" console>
                        <module.ConsoleSessionsPage />
                    </HelmetProvider>
                )),
        },
        {
            path: 'tickets',
            element: () =>
                import('@/pages/console/ConsoleTicketsPage').then(module => (
                    <HelmetProvider title="Tickets" console>
                        <module.ConsoleTicketsPage />
                    </HelmetProvider>
                )),
        },
        {
            path: 'halls',
            element: () =>
                import('@/pages/console/ConsoleHallsPage').then(module => (
                    <HelmetProvider title="Halls" console>
                        <module.ConsoleHallsPage />
                    </HelmetProvider>
                )),
        },
        {
            path: 'genres',
            element: () =>
                import('@/pages/console/ConsoleGenresPage').then(module => (
                    <HelmetProvider title="Genres" console>
                        <module.ConsoleGenresPage />
                    </HelmetProvider>
                )),
        },
        {
            path: 'directors',
            element: () =>
                import('@/pages/console/ConsoleDirectorsPage').then(module => (
                    <HelmetProvider title="Directors" console>
                        <module.ConsoleDirectorsPage />
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
