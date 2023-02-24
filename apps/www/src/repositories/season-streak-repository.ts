import { ISeasonStandingGroupStanding } from 'src/interface'

export class SeasonStreakRepository {
  getFormattedStreak(
    standing: ISeasonStandingGroupStanding
  ): string[] | undefined {
    // Return if no standing streak exist
    if (!standing?.streak) {
      return
    }

    let streakText = ''

    // Handle lose streak
    if (standing?.streak?.startsWith('L')) {
      streakText += [
        ...Array(standing?.last_ten_loss_record).fill('L'),
        ...Array(standing?.last_ten_win_record).fill('W'),
      ].join('')
    }

    // Handle win streak
    else if (standing?.streak?.startsWith('W')) {
      streakText += [
        ...Array(standing?.last_ten_win_record).fill('W'),
        ...Array(standing?.last_ten_loss_record).fill('L'),
      ].join('')
    }

    return `${streakText}-----`.split('').slice(0, 5)
  }
}
