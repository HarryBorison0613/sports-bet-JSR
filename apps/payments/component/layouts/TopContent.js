import Image from "next/image";
import Link from "next/link";
import {siteLogo
  } from "../../lib/siteDefault"

export default function TopContent() {
    return (
        <>
        <header>

            <div className="logo-container">
                
                <Link href="https://pro.bets.com.br/">
                    <a className="logo">
                        <Image
                            src={"/"+siteLogo}
                            alt="Bets Logo"
                            layout='fill'
                            size={'20vw'}
                        />
                    </a>
                </Link>
            </div>

            <div className="heading-container">
                <h1>
                    Bem-vindo à Melhor Plataforma de
                    <br /> Apostas Esportivas do Brasil
                </h1>
                <p>+1.000 de assinaturas por dia</p>
            </div>

        </header>
            
        </>
    )
}