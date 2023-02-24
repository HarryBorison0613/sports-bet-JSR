import Image from "next/image";
import Link from "next/link";


export default function TopContent() {
    return (
        <>
        <header>
            <div className="container-fluid">

                <div className="logo-container">
                    
                    <Link href="https://pro.bets.com.br/">
                        <a className="logo">
                            <Image
                                src='/img/bets.png'
                                alt="Bets Logo"
                                layout='fill'
                            />
                        </a>
                    </Link>
                </div>

            </div>

        </header>
            
        </>
    )
}