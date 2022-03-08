import { StrictMode } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthProvider, { RequireAnon, RequireAuth } from '@/providers/AuthProvider'
import ToastProvider from '@/providers/ToastProvider'
import Layout from './components/Layouts/Layout'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import AdminLayout from './components/Layouts/AdminLayout'
import AdminPage from './pages/admin/AdminPage'
import AdminMoviesPage from './pages/admin/AdminMoviesPage'
import './styles/index.css'

axios.defaults.baseURL = import.meta.env.APP_API_URL
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Accept'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

render(
    <StrictMode>
        <ToastProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="movies">
                                <Route index element={<MoviesPage />} />
                                <Route path=":movie" element={<MoviePage />} />
                            </Route>
                            <Route
                                path="signin"
                                element={
                                    <RequireAnon>
                                        <SignInPage />
                                    </RequireAnon>
                                }
                            />
                            <Route
                                path="signup"
                                element={
                                    <RequireAnon>
                                        <SignUpPage />
                                    </RequireAnon>
                                }
                            />
                        </Route>
                        <Route
                            path="admin"
                            element={
                                <RequireAuth>
                                    <AdminLayout />
                                </RequireAuth>
                            }
                        >
                            <Route index element={<AdminPage />} />
                            <Route path="movies" element={<AdminMoviesPage />} />
                            <Route path="*" element={<AdminPage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ToastProvider>
    </StrictMode>,
    document.getElementById('root')
)
