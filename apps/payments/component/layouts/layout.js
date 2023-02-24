import Header from "./TopContent"
import Footer from "./Footer"
import Decor from "./Decor"
import Head from 'next/head';

export default function Layout({ children }) {

 
  return (
    <>
    <Head>
      <title>Bets pagamentos</title>
      <link rel="shortcut icon" href="/conta/pagamentos/img/favicon.ico" />
    </Head>
    <div className="container-inner">
      <Header/>
      <Decor />
        <main className={`min-h-screen`}>
                {children}
        </main>
      <Footer />
    </div>
    </>
  )
}