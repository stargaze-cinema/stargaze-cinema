import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/providers/ToastProvider'
import { LabeledInput } from '@/components/Inputs/LabeledInput'
import { InputSubmit } from '@/components/Inputs/InputSubmit'
import style from '@/assets/styles/auth.module.scss'

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate()
    const { toastPromise } = useToast()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setState({
            ...state,
            [target.name]: target.value,
        })

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
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
                <LabeledInput
                    label="Your name"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Your email"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Your password"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Confirm your password"
                    type="password"
                    name="password_confirmation"
                    value={state.password_confirmation}
                    onChange={handleChange}
                    required
                />
                <InputSubmit label="Sign up" />
                <span>
                    Already a member? <Link to="/signin">Sign in!</Link>
                </span>
            </form>
        </div>
    )
}
