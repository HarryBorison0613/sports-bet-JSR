import React from 'react'
import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import Card from 'src/components/Card/Card'
import TeamMainContentSkeleton from './TeamMainContentSkeleton'
import FollowButton from 'src/components/FollowButton/FollowButton'

import Axios from 'axios'
import { toast } from 'react-toastify'

const TeamMainContent: React.FC = () => {
  const { isLoadingTeamContext, profile, createCustomTeamHref } =
    useTeamContext()

  let location = ''

  if (typeof window !== 'undefined') {
    location = decodeURI(window?.location?.href)
  }

  console.log('location', location)

  if (isLoadingTeamContext) {
    return <TeamMainContentSkeleton />
  }

  if (!profile) {
    return <></>
  }

  const handleFollow = (e: any) => {
    e.preventDefault()

    const token = localStorage.MyAccountToken

    if (token) {
      if (location) {
        const teamData = {
          currentURL: location,
          token: token,
        }
        Axios.post('/api/myaccount/favoriteteam/add', teamData)
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
      }
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
          title={profile?.competitor?.name!}
          titleHref={createCustomTeamHref(profile?.competitor)}
          icon={profile?.competitor?.icon}
          descriptionIcon={profile?.category?.country_info?.icon}
          descriptionText={profile?.category?.country_info?.name}
        >
          <FollowButton onClick={handleFollow} />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>{profile?.summary_text}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default TeamMainContent
