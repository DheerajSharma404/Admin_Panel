import Header from "./Header"
import Sidebar from "./Sidebar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="grid grid-cols-4 h-screen overflow-y-scroll">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-3 flex flex-col space-y-4">
        <div className="w-full">
          <Header />
        </div>
        <div className="p-4 flex-grow">{children}</div>
        {/* <div className="w-full">
          <Footer />
        </div> */}
      </div>
    </div>
  )
}

export default MainLayout
