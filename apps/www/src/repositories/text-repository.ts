import { ILeagueSummary, ISeasonSummary, ITeamProfile } from 'src/interface'
import { DateFormatTemplate, formatDate } from 'src/utils/date'
import { templateString } from 'src/utils/string'
import i18nData from 'src/i18n/common.json'

export class TextRepository {
  resolveGender(gender: string) {
    return (i18nData as any)[gender] ?? gender
  }

  leagueSummaryText(summary: ILeagueSummary) {
    return templateString(
      '{leagueName}, também conhecida como {seasonName}, ' +
        'é o campeonato de {sportName} profissional no {categoryName} na categoria {gender}. ' +
        'Existem ao todo {teamCount} times que competem pelo título todos os anos entre ' +
        '{dateStart} e {dateEnd}.',
      {
        leagueName: summary?.league?.name,
        seasonName: summary?.current_season?.name,
        sportName: summary?.sport,
        categoryName: summary?.league?.country_info?.name,
        gender: this.resolveGender(summary?.league?.gender),
        teamCount: summary?.current_season_teams?.length,
        dateStart: formatDate(
          summary?.current_season?.start_date,
          DateFormatTemplate.numeric
        ),
        dateEnd: formatDate(
          summary?.current_season?.end_date,
          DateFormatTemplate.numeric
        ),
      }
    )
  }

  /**
   * Generate team profile summary
   * @param normalizedProfile
   * @returns
   */
  teamProfileSummaryText(normalizedProfile: ITeamProfile): string | undefined {
    // const gender = normalizedProfile?.competitor?.gender

    const templateText =
      '{teamName} é um time profissional de {sportName} do(a) {categoryName}. ' +
      'Seu atual treinador é {managerName}. ' +
      'A casa do {teamName} é o {venueName} e sua capacidade é de {venueCapacity}, ' +
      'localização: {venueLocation}. O time joga atualmente com {jerseyCount} uniformes oficiais. ' +
      'Você pode encontrar mais informações sobre este time aqui embaixo, é só rolar e ficar por dentro de tudo!'

    return templateString(templateText, {
      teamName: normalizedProfile?.competitor?.name,
      sportName: normalizedProfile?.sport?.name,
      categoryName: normalizedProfile?.category?.name,
      managerName: normalizedProfile?.manager?.name,
      managerCountryName: normalizedProfile?.manager?.country_info?.name,
      venueName: normalizedProfile?.venue?.name,
      venueCapacity: normalizedProfile?.venue?.capacity,
      venueLocation: `${normalizedProfile?.venue?.city_name}, ${normalizedProfile?.venue?.country_name}`,
      jerseyCount: normalizedProfile?.jerseys?.length,
    })
  }

  /**
   * Generate season summary text
   * @param summary
   * @returns
   */
  seasonSummaryText(summary: ISeasonSummary) {
    //  const startDate = summary?.sport_event_context?.season?.start_date_formatted
    //  const endDate = summary?.sport_event_context?.season?.end_date_formatted

    const text =
      '{competitionName} é uma competição profissional de {sportName} disputada no(a) {countryName} na categoria {gender}. ' +
      'No geral, {teamCount} equipes disputam o título todos os anos e a competição acontece entre ' +
      '{dateStart} e {dateEnd}. Para acompanhar a pontuação dos times que estão disputando o ' +
      'caneco e os próximos jogos da competição, visite nossa página dedicada a ' +
      '{competitionName} e fique por dentro de tudo que está acontecendo na liga.'

    return templateString(text, {
      competitionName: summary?.sport_event_context?.competition?.name,
      seasonName: summary?.sport_event_context?.season?.name,
      sportName: summary?.sport_event_context?.sport?.name,
      countryName: summary?.sport_event_context?.category?.country_info?.name,
      gender: this.resolveGender(
        summary?.sport_event_context?.competition?.gender
      ),
      teamCount: summary?.teams?.length,
      dateStart: formatDate(
        summary?.sport_event_context?.season?.start_date,
        DateFormatTemplate.numeric
      ),
      dateEnd: formatDate(
        summary?.sport_event_context?.season?.end_date,
        DateFormatTemplate.numeric
      ),
    })
  }
}
