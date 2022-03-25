import { render } from 'react-dom'
import { AppProvider } from './providers/AppProvider'
import { Router } from './router/Router'
import '@/assets/styles/index.css'

render(
    <AppProvider>
        <Router />
    </AppProvider>,
    document.getElementById('root')
)
