import Footer from "../footer/Footer"
import Navbar from "../header/Navbar"


const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default LayoutWrapper