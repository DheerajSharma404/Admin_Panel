import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow overflow-y-auto p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
