import { Route, Routes, Navigate } from 'react-router-dom'
import { HelmetProvider } from '@/providers/HelmetProvider'
import { RequireAnon } from '@/providers/AuthProvider'
import { Layout } from '@/components/Layouts/Layout'
import { MoviesPage } from '@/pages/MoviesPage'
import { MoviePage } from '@/pages/MoviePage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/movies" />} />
                <Route path="movies">
                    <Route
                        index
                        element={
                            <HelmetProvider title="Movies">
                                <MoviesPage />
                            </HelmetProvider>
                        }
                    />
                    <Route path=":movie" element={<MoviePage />} />
                </Route>
                <Route
                    path="signin"
                    element={
                        <RequireAnon>
                            <HelmetProvider title="Sign in">
                                <SignInPage />
                            </HelmetProvider>
                        </RequireAnon>
                    }
                />
                <Route
                    path="signup"
                    element={
                        <RequireAnon>
                            <HelmetProvider title="Sign up">
                                <SignUpPage />
                            </HelmetProvider>
                        </RequireAnon>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
