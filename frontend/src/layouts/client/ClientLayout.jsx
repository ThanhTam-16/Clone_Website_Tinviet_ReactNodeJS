import { Outlet } from 'react-router-dom'
import TopNav from './TopNav.jsx'
import HeaderBar from './HeaderBar.jsx'
import MainBar from './MainBar.jsx'
import PartnersBar from './PartnersBar.jsx'
import Footer from './Footer.jsx'

export default function ClientLayout() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <HeaderBar />
      <MainBar />

      <main className="mx-auto w-full max-w-6xl px-3 py-4">
        <Outlet />
      </main>

      <PartnersBar />
      <Footer />
    </div>
  )
}
