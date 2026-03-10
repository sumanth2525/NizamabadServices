import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import { AreaProvider } from './context/AreaContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Request from './pages/Request'
import Support from './pages/Support'
import MyRequests from './pages/MyRequests'
import Menu from './pages/Menu'
import Auth from './pages/Auth'
import RegisterProvider from './pages/RegisterProvider'
import ProviderContact from './pages/ProviderContact'
import Insight from './pages/Insight'

export default function App() {
  return (
    <LanguageProvider>
      <AreaProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/service/:slug" element={<Request />} />
          <Route path="/service/:slug/provider/:providerId" element={<ProviderContact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/register-provider" element={<RegisterProvider />} />
        </Routes>
      </Layout>
      </AreaProvider>
    </LanguageProvider>
  )
}
