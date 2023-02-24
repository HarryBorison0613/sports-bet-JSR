
import {
    Telegram,
    YouTube,
    Instagram,
    Twitter,
    FaceBook,
} from "../../styles/icons";
import Image from "next/image";
import Link from "next/link";
import {footerLogo
} from "../../lib/siteDefault";
import Chat from "../../lib/chat";


export default function Footer() {



    return (
        <>
        <footer>
            <div className="mobile-view">
            <Link href="mailto:suporte@bets.com.br">
                <a className="footer__mail">
                    suporte@bets.com.br
                </a>
            </Link>

                <div className="social-icon">
                <FaceBook />
                <Twitter />
                <Instagram />
                <YouTube />
                <Telegram />
                </div>
                <div className="relative-logo">
                <div className="footer__logo">
                    <Image
                            src={"/"+footerLogo}
                            alt="Bets Logo "
                            layout='fill'
                        />
                </div>
            </div>
        </div>

        <div className="footer__chat">
            <Chat />
        </div>
         

        </footer>
        
        </>
        
    )
}
