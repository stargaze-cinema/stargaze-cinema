import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from '@/components/Providers/UserProvider'
import ToastProvider from '@/components/Providers/ToastProvider'
import Layout from './components/Layouts/Layout'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import ErrorPage from './pages/ErrorPage'
import AdminLayout from './components/Layouts/AdminLayout'
import AdminPage from './pages/admin/AdminPage'
import AdminMoviesPage from './pages/admin/AdminMoviesPage'
import './styles/index.css'

render(
    <StrictMode>
        <ToastProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="movies">
                                <Route index element={<MoviesPage />} />
                                <Route path=":movie" element={<MoviePage />} />
                            </Route>
                        </Route>
                        <Route path="admin" element={<AdminLayout />}>
                            <Route index element={<AdminPage />} />
                            <Route path="movies" element={<AdminMoviesPage />} />
                            <Route path="*" element={<AdminPage />} />
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </ToastProvider>
    </StrictMode>,
    document.getElementById('root')
)
