import Card from 'src/components/Card/Card'
import Image from '@app/image'
import type { ITeamProfile } from 'src/interface'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'

export interface ITeamPlayersContentProps {
  profile: ITeamProfile
}

export const TeamPlayersContent: React.FC<ITeamPlayersContentProps> = ({
  profile,
}) => {
  const { paginatedData, completed, nextPage } = usePaginatedData(
    profile?.players,
    8
  )

  return (
    <Card title="Jogadores" viewMore={!completed} onClickViewMore={nextPage}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {paginatedData?.map((player) => (
          <div
            key={player?.player_id}
            className="p-4 lg:border-r border-b grid items-center grid-cols-12 gap-3 hover:bg-slate-50 cursor-pointer"
          >
            <div className="col-span-2">
              <div className="w-full aspect-square relative">
                {/* {player?.icon && (
                  <Image
                    src={player?.icon}
                    alt={player?.name}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={shimmer(2, 2)}
                    className="rounded-full"
                  />
                )} */}
              </div>
            </div>

            <div className="col-span-6">
              <div className="font-medium text-primary-500 text-sm">
                {player?.name}
              </div>
              <small className="text-slate-500">
                {player?.age_in_years} Anos
              </small>
            </div>

            <div className="col-span-4">
              <small className="capitalize">{player?.type}</small>
              <div className="flex items-center gap-1">
                {player?.country_info?.icon && (
                  <Image
                    src={player?.country_info?.icon}
                    alt={player?.country_info?.name}
                    width={18}
                    height={18}
                  />
                )}
                <div className="uppercase">{player?.country_code}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
