import React from 'react'
import cx from 'classnames'

import { IInputTextFeildParams } from 'src/interface'
import styles from './InputTextField.module.css'

const InputTextField: React.FC<IInputTextFeildParams> = ({
  name,
  label,
  error,
  type,
  onChange,
  htmlFor,
  value,
  id,
  style,
  margin,
  disable,
}) => {
  return (
    <div className={cx(margin)}>
      <label htmlFor={htmlFor} className={cx(styles.text, 'capitalize')}>
        {label}
      </label>
      {disable ? (
        <input
          type={type}
          className={cx(style, 'bg-gray-100')}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          required
          disabled
        />
      ) : (
        <input
          type={type}
          className={cx(
            style,
            'peer',
            'border',
            error ? 'invalid:border-pink-500 focus:invalid:ring-pink-300' : ''
          )}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          required
        />
      )}

      {error ? (
        <p className="text-pink-600 text-sm">{error}</p>
      ) : (
        <p className="h-[20px]"></p>
      )}
    </div>
  )
}

export default InputTextField
