import Header from "src/components/Success/Layout/TopContent";
import Footer from "src/components/Success/Layout/Footer";
import Decor from "src/components/Success/Layout/Decor";
import Head from 'next/head';

const Layout: React.FC<any> = ({ children }) => {
  return (
    
      <>
      <Head>
        <title>Bets pagamentos</title>
        <link rel="shortcut icon" href="/icons/logo@32w.png" />
      </Head>

      <div className="container-inner relative">
      
        <Header/>
        <Decor />
        <main>
                {children}
        </main>
        <Footer />
      </div>
          
        
      </>
    
  )
}

export default Layout