import { Route, Routes } from 'react-router-dom'
import { RequireAdmin, RequireAnon } from '@/providers/AuthProvider'
import { AdminLayout } from '@/components/Layouts/AdminLayout'
import { ConsolePage } from '@/pages/console/ConsolePage'
import { ConsoleMoviesPage } from '@/pages/console/ConsoleMoviesPage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { HelmetProvider } from '@/providers/HelmetProvider'

export const ConsoleRouter: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAdmin>
                        <AdminLayout />
                    </RequireAdmin>
                }
            >
                <Route
                    index
                    element={
                        <HelmetProvider title="Index" console>
                            <ConsolePage />
                        </HelmetProvider>
                    }
                />
                <Route
                    path="movies"
                    element={
                        <HelmetProvider title="Movies" console>
                            <ConsoleMoviesPage />
                        </HelmetProvider>
                    }
                />
            </Route>
            <Route
                path="/signin"
                element={
                    <RequireAnon>
                        <HelmetProvider title="Sign in" console>
                            <SignInPage />
                        </HelmetProvider>
                    </RequireAnon>
                }
            />
            <Route
                path="/signup"
                element={
                    <RequireAnon>
                        <HelmetProvider title="Sign up" console>
                            <SignUpPage />
                        </HelmetProvider>
                    </RequireAnon>
                }
            />
            <Route path="*" element={<AdminLayout />} />
        </Routes>
    )
}
