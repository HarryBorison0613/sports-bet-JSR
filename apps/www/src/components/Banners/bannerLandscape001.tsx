import Link from '@app/link'
import Image from "next/image";
import { cloudflareLoader } from 'src/utils/image'
import Button from 'src/components/Button/Button'

const Horizontal001 = (props:any) => {

  return (
    <div className="relative p-3 w-full rounded-md overflow-hidden bg-gradient-to-r from-black min-h-20">
        <Image
            src={props.img}
            alt="stadium"
            layout="fill"
            className="cover -z-10"
            loader={cloudflareLoader}
        />
        <Link href="https://pro.bets.com.br">
            <a className="">
                <div className="flex flex-wrap items-center justify-between relative">
                    <div className="px-3 flex flex-wrap items-center">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                            loader={cloudflareLoader}
                        />

                        <div className="text-white text-sm pl-4">
                            <div>Você sabe quem vai ganhar? </div> 
                            <div className="underline">Bets.com.br</div> 
                        </div>
                    </div>

                    <Button className="px-4 !bg-red-700 hover:!bg-primary-500 mr-3">
                        Aposte agora!
                    </Button>

                </div>
            </a>
            </Link>
    </div>
    
  )
}

export default Horizontal001