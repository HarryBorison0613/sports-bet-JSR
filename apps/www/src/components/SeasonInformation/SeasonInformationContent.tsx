import Card from 'src/components/Card/Card'
import Image from '@app/image'
import Link from '@app/link'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import type { ISeason, ISeasonStandingStatistics, ITeam } from 'src/interface'
import React from 'react'

export interface ISeasonInformationContentProps {
  season?: ISeason
  seasonStandingStat?: ISeasonStandingStatistics
  topCompetitors: ITeam[]
}

export const SeasonInformationContent: React.FC<
  ISeasonInformationContentProps
> = ({ season, seasonStandingStat, topCompetitors }) => {
  const { createTeamHref } = useCreateHref()

  return (
    <Card title="Informações da Liga">
      <Card.Content className="grid grid-cols-2 gap-4">
        {topCompetitors?.map((team) => (
          <Link key={team?.id} href={createTeamHref(team, season!)}>
            <a className="grid gap-2 place-items-center cursor-pointer hover:text-primary-500 ">
              <Image src={team?.icon} alt={team?.name} width={64} height={64} />
              <div className="rounded-md mx-auto text-xs font-bold text-center">
                {team?.name}
              </div>
            </a>
          </Link>
        ))}
      </Card.Content>

      <Card.Content title="Estatísticas">
        {seasonStandingStat?.total?.goals ? (
          <Card.LineItem label="Gols">
            {seasonStandingStat?.total?.goals}
          </Card.LineItem>
        ) : null}

        {seasonStandingStat?.total.points ? (
          <Card.LineItem label="Pts">
            {seasonStandingStat?.total?.points}
          </Card.LineItem>
        ) : null}

        <Card.LineItem label="Vitórias do Mandante">{`${
          seasonStandingStat?.home_win_percentage ?? 0
        }%`}</Card.LineItem>

        <Card.LineItem label="Vitórias do Visitante">{`${
          seasonStandingStat?.away_win_percentage ?? 0
        }%`}</Card.LineItem>

        <Card.LineItem label="Empates">{`${
          seasonStandingStat?.draw_percentage ?? 0
        }%`}</Card.LineItem>

        <Card.LineItem label="Total de competidores">
          {seasonStandingStat?.total?.total_competitors}
        </Card.LineItem>
      </Card.Content>
    </Card>
  )
}
