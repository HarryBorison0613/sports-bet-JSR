import Card from 'src/components/Card/Card'
import { MatchListTeamsDetailedSkeleton } from './MatchListTeamsDetailedSkeleton'
import MatchListTeamsDetailedTeam from './MatchListTeamsDetailedTeam'
import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import Link from '@app/link'
import { useRouter } from 'next/router'
import LiveIndicator from 'src/components/LiveIndicator/LiveIndicator'
import { cloudflareLoader } from 'src/utils/image'
import Image from "next/image";

const MatchListTeamsDetailed: React.FC = () => {

  const router = useRouter()
  const {id} = router.query

  const { games } = useMatchListContext();
  const { seasonHrefArguments, teamHrefArguments } = useCreateHref()
  let homeUrl = {}
  let awayUrl = {}
  let competitionName = ''
  let competitionIcon = ''
  let country = ''
  let countryIcon = ''
  let homeTeam = {}
  let awayTeam = {}
  let homeScore = ''
  let awayScore = ''
  let seasonUrl = {}
  let status = ''
  games.map((item, index) => {
    //console.log(id, '--->', item.sport_event.sport_event_id)
      if(item.sport_event.sport_event_id === id) {
        homeUrl = teamHrefArguments(item, 0)
        awayUrl = teamHrefArguments(item, 1)
        competitionName = item.sport_event.sport_event_context.season.name;
        competitionIcon = item.sport_event.sport_event_context.competition.icon;
        country = item.sport_event.sport_event_context.category.name;
        countryIcon = item.sport_event.sport_event_context.category.country_info.icon;
        homeTeam = item.sport_event.competitors[0];
        awayTeam = item.sport_event.competitors[1];
        homeScore = item.sport_event_status.home_score ? item.sport_event_status.home_score.toString() : '0';
        awayScore = item.sport_event_status.away_score ? item.sport_event_status.away_score.toString() : '0';
        seasonUrl = seasonHrefArguments(item)
        status = item.sport_event_status.status

      }
  })

 

  // Empty
  if (!competitionName) {
    return <></>
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header
          titleHref={seasonUrl}
          title={competitionName}
          icon={competitionIcon}
          descriptionIcon={countryIcon}
          descriptionText={country !}
        >
        </Card.Header>
      </Card.Content>

      <Card.Content>
        <div className="flex items-center justify-between lg:justify-center gap-4 lg:gap-8 mx-auto">
          {homeTeam && (
             <MatchListTeamsDetailedTeam team={homeTeam}/>
          )}

          <div className="text-center">
            <div className="text-lg md:text-xl xl:text-2xl lg:text-4xl font-bold">
              {homeScore ?? 0} - {awayScore ?? 0}
            </div>
            
            <div className="mt-3">
              {status === 'live' ? 
                    <LiveIndicator />
                  
              : null }
            </div>

          </div>

          {awayTeam && (
            <MatchListTeamsDetailedTeam team={awayTeam} />
          )}
        </div>
        {/* <div className="mt-2 flex justify-center">
              {status === 'live' ? 
                    <Link href="https://pro.bets.com.br/">
                        <a className="px-2 py-1 text-white bg-red-700 text-sm leading-none text-center hover:!bg-primary max-w-[180px] flex items-center" >
  
                          <Image
                                src="/logo.png"
                                alt="logo"
                                width={25}
                                height={25}
                                className="w-full h-full object-contain"
                                loader={cloudflareLoader}
                            />
                            <span className="ml-2">
                              Aposte agora!
                            </span>
                          
                        </a>
                    </Link> 
                  
              : null }
          </div> */}
      </Card.Content>
    </Card>
  )
}

export default MatchListTeamsDetailed
