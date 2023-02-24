import Image from "next/image";

export default function Reasons() {
  
    let reasons = ['Mais de 750.000 jogos ao vivo por ano',
                    'Mais de 2 milhões de páginas de conteúdo sobre 57 esportes, ligas, times e jogadores',
                    'Bet Assist: Algoritmos profissionais que ajudam você a tomar uma decisão informada sobre os jogos vencedores',
                    '11 casas de apostas em todo o mundo que lhe dão as melhores chances em cada jogo.',
                    'Depósitos/ Saques imediatos',
                    'Mais de 30 jornalistas escrevendo conteúdos diários sobre 11 esportes no mundo',
                    'Aceita PIX ou criptomoedas',
                    'Site seguro',
                    'Vídeos em destaque em todos os esportes diariamente',
                    'Live Chat, Telegram e suporte por e-mail 24/7'];


    return (
        <>
            <section className="reasons bg-white lg:pt-20 md:pb-20 index-10">

                <div className="container">
                    <div className="flex flex-wrap w-full items-center">
                        <div className="w-full lg:w-1/2 shadow-full bg-[#043664] text-white rounded relative">

                            <div className="p-6 md:p-10">
                                <div className="text-[20px] md:text-[26px] font-bold mb-6 md:pb-8">
                                    10 razões pelas quais a Bets.com.br é a melhor plataforma de apostas esportivas do mundo! 
                                </div>

                                {reasons.map(item => (
                                    <li className="flex items-center mb-5 md:mb-8 w-full" key={item}>
                                        <div className="image mr-4 w-1/12">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <circle cx="11" cy="11" r="11" fill="#58ACF2"/>
                                                <circle cx="11" cy="11" r="7.5625" fill="#04315D"/>
                                            </svg>
                                        </div>
                                        <div className="text-[18px] md:text-[20px] w-11/12 -ml-4">
                                            {item}
                                        </div>
                                        
                                    </li>
                                ))}
                            </div>


                        </div>
                        <div className="w-full lg:w-1/2 md:px-14 py-6">
                            <div className="text-center  pt-5 pb-5 pl-12 pr-12 rounded h-full flex flex-col relative">
                                    <Image
                                        src="/img/phones.png"
                                        alt="number-2"
                                        width={'500'}
                                        height={'500'}
                                    />
                                

                            </div>

                        </div>

                    </div>
                </div>

            </section>
        
        </>
    )
}