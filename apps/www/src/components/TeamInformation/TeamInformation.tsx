import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import Card, { ICardProps } from 'src/components/Card/Card'
import { TeamInformationSkeleton } from './TeamInformationSkeleton'
import Image from '@app/image'
import React from 'react'
import Link from '@app/link'

const TeamInformation: React.FC<ICardProps> = (props) => {
  const { isLoadingTeamContext, profile, createCustomTeamHref } =
    useTeamContext()

  // Loading
  if (isLoadingTeamContext) {
    return <TeamInformationSkeleton {...props} />
  }

  // Empty profile
  if (!profile) {
    return <></>
  }

  return (
    <Card title="Informações da Equipe" {...props}>
      <Card.Content className="grid place-content-center">
        <Link href={createCustomTeamHref(profile?.competitor)}>
          <a>
            <Image
              src={profile?.competitor?.icon}
              alt={profile?.competitor?.name}
              width={80}
              height={80}
            />
          </a>
        </Link>
      </Card.Content>

      {/* <TeamInfoWidget
        seasonId={query?.season_id}
        teamUid={profile?.competitor?.team_id}
      /> */}

      <Card.Content className="py-0">
        <Card.LineItem label="Nome Comp">
          {profile?.competitor?.name}
        </Card.LineItem>

        <Card.LineItem label="Nome Pop">
          {profile?.competitor?.abbreviation}
        </Card.LineItem>

        {profile?.manager ? (
          <Card.LineItem label="Treinador">
            <Card.Header
              size="small"
              title={profile?.manager?.name}
              descriptionIcon={profile?.manager?.country_info?.icon}
              descriptionText={profile?.manager?.country_info?.name}
              titleClassName="text-right !leading-[1.4]"
              descriptionClassName="!justify-end"
            />
          </Card.LineItem>
        ) : null}

        <Card.LineItem label="Total de jogadores">
          {profile?.total_players}
        </Card.LineItem>

        <Card.LineItem label="Jogadores estrangeiros">
          {profile?.foreign_players}
        </Card.LineItem>

        <Card.LineItem label="Jogadores nacionais">
          {profile?.home_players}
        </Card.LineItem>
      </Card.Content>

      <Card.Content className="py-0" title="Estádio">
        <Card.LineItem label="Nome">{profile?.venue?.name}</Card.LineItem>

        <Card.LineItem label="Capacidade">
          {profile?.venue?.capacity}
        </Card.LineItem>

        <Card.LineItem label="Cidade">
          {profile?.venue?.city_name}, {profile?.venue?.country_name}
        </Card.LineItem>
      </Card.Content>
    </Card>
  )
}

export default TeamInformation
