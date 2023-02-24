import Link from '@app/link'
import Image from "next/image";
import { cloudflareLoader } from 'src/utils/image'
import Button from 'src/components/Button/Button'

const Horizontal001 = (props:any) => {

  return (
    <div className="relative p-3 w-full rounded-md overflow-hidden bg-gradient-to-b from-black via-[#006dcc85] to-black">
        <Image
            src={props.img}
            alt="stadium"
            layout="fill"
            className="cover -z-10"
            loader={cloudflareLoader}
        />

        <Link href="/conta/cadastro">
            <a className="">

                    <div className="text-white font-semibold text-center text-sm md:text-lg px-4 mb-4 relative z-10 py-3 drop-shadow-md">
                        Melhores chances garantidas com Bets.com.br
                    </div>

                <div className="mb-3 text-center">
                    <Image
                        src="/img/logo-shadow.png"
                        alt="logo"
                        width={65}
                        height={65}
                        className="w-full h-full object-contain"
                        loader={cloudflareLoader}
                    />

                    <div className="absolute -right-16 top-20">
                        <Image
                            src="/img/custom-men.png"
                            alt="player"
                            width="200"
                            height="200"
                            className="opacity-50 right-20"
                            loader={cloudflareLoader}
                        />
                    </div>

                    <div className="flex flex-wrap justify-between px-10 mt-6 mb-10 px-6 bg-white rounded-md relative z-10">
                        <Image
                            src="/logos/leagues-v2/325.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-full h-full object-contain mx-3"
                            loader={cloudflareLoader}
                        />
                        <Image
                            src="/logos/leagues-v2/8.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain mx-3"
                            loader={cloudflareLoader}
                        />

                        <Image
                            src="/logos/leagues-v2/699.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-full h-full object-contain mx-3"
                            loader={cloudflareLoader}
                        />

                        <Image
                            src="/logos/leagues-v2/35.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-full h-full object-contain mx-3"
                            loader={cloudflareLoader}
                        />

                        <Image
                            src="/logos/leagues-v2/92.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-full h-full object-contain mx-3"
                            loader={cloudflareLoader}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between relative justify-center">

                    <Button className="px-4 !bg-red-700 hover:!bg-primary-500 mb-6">
                        Cadastre-se Agora
                    </Button>

                </div>
            </a>
            </Link>
    </div>
    
  )
}

export default Horizontal001