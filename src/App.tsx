import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import { AreaProvider } from './context/AreaContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Request from './pages/Request'
import Support from './pages/Support'
import MyRequests from './pages/MyRequests'
import Menu from './pages/Menu'
import RegisterProvider from './pages/RegisterProvider'

export default function App() {
  return (
    <LanguageProvider>
      <AreaProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:slug" element={<Request />} />
          <Route path="/support" element={<Support />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/register-provider" element={<RegisterProvider />} />
        </Routes>
      </Layout>
      </AreaProvider>
    </LanguageProvider>
  )
}
