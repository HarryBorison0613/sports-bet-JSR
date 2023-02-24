import type { IGameSummary } from 'src/interface'
import Image from '@app/image'
import useGameSummaryItem from 'src/hooks/useGameSummaryItem/useGameSummaryItem'
import LiveIndicator from 'src/components/LiveIndicator/LiveIndicator'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'
import Router from 'next/router'
import { useRouter } from 'next/router'
import cx from 'classnames'

export interface IMatchListItemProps {
  summary: IGameSummary
}



const MatchListItem: React.FC<IMatchListItemProps> = ({ summary }) => {
  const router = useRouter()
  const {id} = router.query

  const { homeTeam, awayTeam, timestamp, live, ended } = useGameSummaryItem(summary)
  const liveScore = summary?.sport_event_status?.home_score+' - '+ summary?.sport_event_status?.away_score
  const mySport = summary.sport_event.sport_event_context.sport.slug;
  const game = summary?.sport_event.sport_event_id
  const competitionName = summary?.sport_event.sport_event_context.competition.name
  const competitionIcon = summary?.sport_event.sport_event_context.competition.icon
  const competitionDescription = summary?.sport_event.sport_event_context.category?.name
  let selectedSport = ''

  if(mySport == 'basquetebol') {
    selectedSport = 'basquete'
  } else if(mySport == 'hóquei-no-gelo') {
    selectedSport = 'hockey-no-gelo'
  } else if(mySport == 'basebol') {
    selectedSport = 'beisebol'
  } else if (mySport == 'futebol-americano' || mySport == 'futebol') {
    selectedSport = mySport
  }


  const gameID = () => {
  if(game) {
    Router.push(
      {
        pathname: '/'+selectedSport+'/jogos',
        query: { id: encodeURI(game) },
      },
      undefined,
      { shallow: true }

    );
  }
  
}


  return (
    <>
        <button onClick={gameID} className="">
    
          <a className={cx(
            'p-4 lg:rounded-md shadow-lg hover:bg-blue-100 hover:text-primary-500 transition-all block w-full',
            {
              'bg-accent': id === game,
            },
            {
              'bg-white': id != game,
            }
            )}>
              <div className="flex flex-wrap items-center mb-3 pb-2 border-b-[1px] border-primary-500 border-solid">
                <Image
                  className="max-h-[56px]"
                  src={competitionIcon}
                  alt={competitionName}
                  width={30}
                  height={30}
                  key={competitionName}
                />
                <div className="text-sm text-primary-500 text-left ml-4">
                  {competitionName} 
                  <span className="text-[10px] text-black"> / {competitionDescription} </span>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">

                <div className="flex items-center gap-4 col-span-4">
                  {homeTeam?.icon && (
                    <Image
                      src={homeTeam?.icon}
                      alt={homeTeam?.abbreviation}
                      width={42}
                      height={42}
                    />
                  )}
                  <div className="font-bold">{homeTeam?.abbreviation}</div>
                </div>

                <div className="col-span-4 grid place-content-center gap-2 text-sm text-center">
                  <span>{timestamp}</span>
                
                  {live ? (
                    <div>
                      <div className="font-bold text-lg">
                        {liveScore}
                      </div>
                      <LiveIndicator />
                    </div>
                    
                  ) : ( 
                    ended ? ( 
                      <div>
                        <div className="font-bold text-lg">
                          {liveScore}
                        </div>
                      </div>
                    ) : ( 
                        <div className="text-xs font-bold">
                          Começa às {summary?.sport_event?.start_time_formatted}
                        </div>
                    )
                    
                  )}
                </div>

                <div className="flex items-center justify-end gap-4 col-span-4">
                  <div className="font-bold">{awayTeam?.abbreviation}</div>
                  {awayTeam?.icon && (
                    <Image
                      src={awayTeam?.icon}
                      alt={awayTeam?.abbreviation}
                      width={42}
                      height={42}
                    />
                  )}
                </div>
              </div>
            

            
          </a>
    </button>

 
    </>

  )
}

export default MatchListItem
