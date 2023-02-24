import Image from "next/image";
import Link from "next/link";
import {
    Telegram,
    YouTube,
    Instagram,
    Twitter,
    FaceBook,
} from "src/components/Success/Layout/Icons";
import Decor from "src/components/Success/Layout/Decor";

export default function Bottom() {

    const images = []
    for (let i = 0; i < 18; i++) {
        let image = '/img/logo-'+i+'.png';
        images.push(
            <div className="w-2/12 md:w-2/12 px-2 my-8 flex justify-center" key={i}>
                <Image
                    src={image}
                    alt={image}
                    width={'80'}
                    height={'80'}
                    className="object-contain"
                />
            </div>)
    }

    return (
        <>
            <section className="bottom bg-white md:pt-20 md:pb-20 index-10 relative bg-[#043664]">
            <Decor />

                <div className="container">
                    <div className="flex flex-wrap w-full items-center">

                        <div className="w-full lg:w-1/3 px-14">
                            <div className="text-center  pt-5 pb-5 pl-12 pr-12 rounded h-full flex flex-col relative">
                                    <Image
                                        src="/img/mobile.png"
                                        alt="number-2"
                                        width={'345'}
                                        height={'622'}
                                    />
                                

                            </div>

                        </div>

                        <div className="w-full lg:w-2/3 text-white">

                            <div className="px-4 py-2 md:p-6 md:p-10">
                                <div className="text-[20px] md:text-[26px] md:text-[42px] font-bold mb-6">
                                    Oferecendo plataformas mobile & desktop 
                                </div>

                                <div className="text-[18px] md:text-[20px] font-bold mb-6 md:pb-8">
                                    1000+ páginas de esportes, ligas, equipes e jogadores para obter as informações de apostas esportivas mais atualizadas disponíveis.
                                </div>

                                <div className="border-white border-[1px] rounded px-4 py-2 md:p-6 flex flex-wrap">
                                    {images}
                                </div>

                                <div className="-mt-[23px] text-center cursor-pointer">
                                    <a href="https://www.bets.com.br/">
                                        <Image
                                            src="/img/plus.png"
                                            alt="more"
                                            width={'46'}
                                            height={'46'}
                                        />
                                    </a>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>

                <footer className="mt-20">
                    <div className="container text-center">
                        <Link href="mailto:suporte@bets.com.br">
                            <a className="footer__mail text-[20px] hidden md:block">
                                suporte@bets.com.br
                            </a>
                        </Link>

                        <div className="social-icon flex flex-wrap justify-center mt-6 items-center hidden md:flex">
                            <div className="px-2">
                                <FaceBook />
                            </div>
                            <div className="px-2">
                                <Twitter />
                            </div>
                            <div className="px-2">
                                <Instagram />
                            </div>
                            <div className="px-2">
                                <YouTube />
                            </div>
                            <div className="px-2">
                                <Telegram />
                            </div>
                            
                        </div>
                        <div className="relative-logo hidden md:block">
                            <div className="footer__logo">
                                <Image
                                        src="/img/logo1.png"
                                        alt="Bets Logo "
                                        width={'89'}
                                        height={'128'}
                                    />
                            </div>
                        </div>
                        <div className="text-center md:px-20 text-white text-[16px] md:text-[24px] mt-20">
                            Bets.com.br é operada pela Blueinic BV, número de registro: HE356617, 176 Athalassas Avenue, Office 401, 2025, Strovolos, Nicosia, Chipre. BLUEINIC B.V. com o número de registro 140279 e endereço em Abraham Mendez Chumaceiro, Boulevard 50, é licenciado pela Antillephone N.V., titular da Licença de Jogo # 8048 / JAZ do Governo Central das Antilhas Holandesas. BLUEINIC B.V. é licenciado e regulamentado em virtude da licença número # 8048 / JAZ2016-030 concedida pelo Governo de Curaçao à BLUEINIC B.V. A licença foi emitida em 06/08/2016.
                        </div>
                    </div>
            

            </footer>

            </section>
        
        </>
    )
}