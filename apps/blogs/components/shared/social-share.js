import { SocialShares } from '../../lib/const'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function SocialShare({ post, settings }) {
  const router = useRouter()
  const domain = settings.defaultSettings.siteUrl

  return (
    <div className="social-share flex flex-wrap items-center my-5 justify-between md:justify-start">
      <div className="font-bold mr-10 md:mr-20 hidden md:block">
        Compartilhe nas redes:
      </div>

      {SocialShares.map((social, index) => (
        <a
          href={social.link + domain + router.asPath}
          rel="noreferrer"
          className={`w-[80px] lg:w-[190px] my-2 md:mr-5 text-white py-3 bg-[#2867B2] flex flex-col items-center p-2 text-center hover:bg-primary ${
            social.title === 'Facebook'
              ? ' bg-[#1877F2]'
              : social.title == 'Twitter'
              ? ' bg-[#1DA1F2]'
              : null
          }`}
          key={index}
          target="_blank"
        >
          <Image src={social.image} width={25} height={25} alt={social.title} />
        </a>
      ))}
    </div>
  )
}
