import Footer from 'src/components/Footer/Footer'
import MobileBottomNav from 'src/components/MobileBottomNav/MobileBottomNav'
import Navbar from 'src/components/Navbar/Navbar'

const BaseLayout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <Footer />

      {/* Placeholder component to compensate the height of mobile bottom navbar */}
      <div className="h-[72px] lg:hidden" />

      <MobileBottomNav />
    </>
  )
}

export default BaseLayout
