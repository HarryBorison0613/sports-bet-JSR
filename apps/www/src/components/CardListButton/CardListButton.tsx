/* eslint-disable @next/next/no-img-element */
import React from 'react'
import cx from 'classnames'
import styles from './CardListButton.module.css'
import Image from '@app/image'

export interface ICardListButtonProps {
  label?: string
  icon?: string
  loading?: boolean
  suffix?: any
  active?: boolean
}

const CardListButton: React.ForwardRefRenderFunction<
  any,
  ICardListButtonProps
> = ({ loading, label, icon, suffix, active, ...restProps }, ref) => {
  const Tag = loading ? 'div' : 'a'

  return (
    <Tag
      className={cx(styles.base, {
        [styles['base-loading']]: loading,
        [styles['active']]: active,
      })}
      {...restProps}
      ref={ref}
    >
      {!loading && icon ? (
        <Image alt={label} src={icon!} width={28} height={28} />
      ) : (
        <div
          className={cx(styles.icon, {
            [styles['icon-loading']]: loading,
          })}
        />
      )}

      <span
        className={cx(styles.text, {
          [styles['text-loading']]: loading,
        })}
      >
        {label}
      </span>

      {suffix}
    </Tag>
  )
}

export default React.forwardRef(CardListButton)
