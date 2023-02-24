import SkeletonDescription from './SkeletonDescription'
import { SkeletonList } from './SkeletonList'
import { SkeletonProfile } from './SkeletonProfile'

export type ISkeletonComponent = React.FC & {
  List: React.FC
  Profile: React.FC
  Description: React.FC
}

const Skeleton: ISkeletonComponent = () => {
  return <></>
}

Skeleton.List = SkeletonList
Skeleton.Profile = SkeletonProfile
Skeleton.Description = SkeletonDescription

export default Skeleton
