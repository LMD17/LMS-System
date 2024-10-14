import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import App from './App'
import { UserProvider } from './Contexts'
import { BookProvider } from './Contexts'
import { IssueProvider } from './Contexts'

createRoot(document.getElementById('root')).render(
  // rap app in providers to access the user, book and issued Contexts
  <StrictMode>
    <UserProvider>
      <BookProvider>
        <IssueProvider>
          <App />
        </IssueProvider>
      </BookProvider>
    </UserProvider>
  </StrictMode>,
)
