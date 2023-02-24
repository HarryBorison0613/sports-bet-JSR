import Card from 'src/components/Card/Card'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'
import Progress from 'src/components/Progress/Progress'
import { SeasonMainContentSkeleton } from './SeasonMainContentSkeleton'
import SeasonClassification from 'src/components/SeasonClassification/SeasonClassification'
import SeasonSwitcher from './SeasonSwitcher'
import FollowButton from 'src/components/FollowButton/FollowButton'
import Axios from 'axios'
import { toast } from 'react-toastify'

const SeasonMainContent: React.FC = () => {
  const {
    summary,
    season,
    category,
    competition,
    seasonHref,
    isLoadingSeasonContext,
  } = useSeasonContext()

  if (isLoadingSeasonContext) {
    return <SeasonMainContentSkeleton />
  }

  let location = ''

  if (typeof window !== 'undefined') {
    location = decodeURI(window?.location?.href)
  }
  const handleFollow = (e: any) => {
    e.preventDefault()

    const token = localStorage.MyAccountToken

    if (token && location) {
      const leagueData = {
        currentURL: location,
        token: token,
      }
      Axios.post('/api/myaccount/favoriteleagues/add', leagueData)
        .then((res) => {
          toast.success(res.data.success, {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
        .catch((err) => {
          if (err.response.status === 208) {
            toast.warn(err.response.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else {
            toast.error('Server Error!', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
    } else {
      toast.error('First, should you log in!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <Card>
      <Card.Content className="border-b">
        <Card.Header
          titleHref={seasonHref}
          icon={competition?.icon!}
          title={season?.name!}
          descriptionIcon={category?.country_info?.icon}
          descriptionText={category?.country_info?.name ?? category?.name}
          description={
            <SeasonSwitcher allSeasons={summary?.all_seasons ?? []}>
              {season?.year}
            </SeasonSwitcher>
          }
        >
          <FollowButton onClick={handleFollow} />
        </Card.Header>

        <Progress
          progress={season?.season_progress!}
          descriptionLeft={season?.start_date_formatted}
          descriptionRight={season?.end_date_formatted}
        />
      </Card.Content>

      <Card.Content>
        <Card.Description>{summary?.season_summary_text}</Card.Description>
      </Card.Content>

      <SeasonClassification />
    </Card>
  )
}

export default SeasonMainContent
