import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/Layout'
import './styles/index.css'

render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="movies">
						<Route index element={<MoviesPage />} />
						<Route path=":movie" element={<MoviePage />} />
					</Route>
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
)
