import MatchListDatePicker from 'src/components/MatchListDatePickerDetailed/MatchListDatePickerDetailed'
import MatchListGameDetailed from 'src/components/MatchListGameDetailed/MatchListGameDetailed'
import MatchListTeamsDetailed from 'src/components/MatchListTeamsDetailed/MatchListTeamsDetailed'
import Banner001 from 'src/components/Banners/bannerLandscape001'
import Banner002 from 'src/components/Banners/bannerPortrait001'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import cx from 'classnames'

const withMatchListWrapper = (App: React.FC<any>) => {
  const MatchListWrapper: React.FC<any> = (props) => {
    const router = useRouter()
    const {id} = router.query

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="grid grid-cols-12 gap-4 py-8 ">
        <div className="p-4 py-0  col-span-12 md:flex items-center justify-between xl:block xl:col-span-3">
          <div className="bg-white p-4 lg:rounded-md shadow-lg mb-4 md:w-1/2 md:mr-2 xl:w-full lg:mr-0">
            <div className="font-semibold">Escolha uma Data</div>
            <MatchListDatePicker className="flex items-center justify-between px-4 pb-8" />
          </div>

          <div className="hidden md:block md:w-1/2 xl:w-full">
            <Banner002 img="/img/custom-background.jpg"/>
          </div>
        </div>

        <div className="block col-span-12 lg:col-span-6 xl:col-span-5">


          <div className="grid gap-y-2">
            <App {...props} />
          </div>
        </div>

        <div className="block col-span-12 lg:col-span-6 xl:col-span-4 lg:bg-white xl:bg-transparent z-10">

        
          <div className={cx("overflow-y-scroll", {'match-list__fixed lg:fixed top-20': scrollY > 90}, {'match-list__fixed--80': scrollY < 90})}>
            <div className="mb-2 hidden lg:block">
              {id && <MatchListTeamsDetailed />}
            </div>

            <div className="mb-2">
              <Banner001 img="/img/stadium001.jpeg"/>
            </div>
          
            <div className="hidden lg:block">
              {id && <MatchListGameDetailed />}
            </div>
            
          </div>
        </div>

      </div>
    )
  }

  return MatchListWrapper
}

export default withMatchListWrapper
