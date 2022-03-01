import { Link } from 'react-router-dom'

const ErrorPage = () => {
	return (
		<div>
			Looks like you got lost! <Link to="/">Go home.</Link>
		</div>
	)
}

export default ErrorPage
