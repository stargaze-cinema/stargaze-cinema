import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/providers/ToastProvider'
import { useAuth } from '@/providers/AuthProvider'
import type { ChangeEvent, FormEvent } from 'react'
import type { User } from '@/types/User'
import style from '@/styles/auth.module.scss'

const SignInPage = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const { toastPromise } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        switch (target.name) {
            case 'email':
                setEmail(target.value)
                break
            case 'password':
                setPassword(target.value)
                break
        }
    }

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toastPromise({
            promise: axios.post('/auth/signin', { email, password }),
            title: 'Signing in...',
            onSuccess: ({ data }: { data: { token: string; user: User } }) => {
                signIn(data.user, data.token, 1)
                navigate('/')
            },
        })
    }

    return (
        <div className={style.authPage}>
            <form onSubmit={handleSumbit}>
                <label>
                    Your email
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Your password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <input type="submit" value="Sign in" />
                <span>
                    Not a member yet? <Link to="/signup">Sign up!</Link>
                </span>
            </form>
        </div>
    )
}

export default SignInPage
