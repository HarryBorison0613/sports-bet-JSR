/* eslint-disable @next/next/no-img-element */
import Link from '@app/link'
import Image from '@app/image'
import { cloudflareLoader } from 'src/utils/image'

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="relative w-[48px] lg:w-[68px] !aspect-square">
        <Image
          src="/logo.png"
          alt="logo"
          width={64}
          height={64}
          className="w-full h-full object-contain"
          loader={cloudflareLoader}
        />
      </a>
    </Link>
  )
}

export default Logo
