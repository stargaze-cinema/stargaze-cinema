import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/providers/ToastProvider'
import type { ChangeEvent, FormEvent } from 'react'
import style from '@/styles/auth.module.scss'

const SignUpPage = () => {
    const navigate = useNavigate()
    const { toastPromise } = useToast()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
        setState({
            ...state,
            [target.name]: target.value,
        })

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toastPromise({
            promise: axios.post('/auth/signup', state),
            title: 'Signing up...',
            onSuccess: () => {
                navigate('/signin')
            },
        })
    }

    return (
        <div className={style.authPage}>
            <form onSubmit={handleSumbit}>
                <label>
                    Your name
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Your email
                    <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Your password
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Confirm your password
                    <input
                        type="password"
                        name="password_confirmation"
                        value={state.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <input type="submit" value="Sign up" />
                <span>
                    Already a member? <Link to="/signin">Sign in!</Link>
                </span>
            </form>
        </div>
    )
}

export default SignUpPage
