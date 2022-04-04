import { createRoot } from 'react-dom/client'
import { AppProvider } from './providers/AppProvider'
import { Router } from './router/Router'
import '@/assets/styles/index.css'

createRoot(document.getElementById('root') as Element).render(
    <AppProvider>
        <Router />
    </AppProvider>
)
