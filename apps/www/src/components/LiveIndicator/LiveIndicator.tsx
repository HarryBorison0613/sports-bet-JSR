import cx from 'classnames'
import React from 'react'

const LiveIndicator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div
      className={cx(
        'px-1 border text-red-500 border-red-500 rounded-sm text-xs inline-block whitespace-nowrap',
        className
      )}
    >
      &bull; Ao Vivo
    </div>
  )
}

export default LiveIndicator
