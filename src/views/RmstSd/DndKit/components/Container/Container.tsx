import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Handle, Remove } from '../Item'

import styles from './Container.module.css'

export interface Props {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        style={{ ...style }}
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow
        )}
        onClick={onClick}
      >
        {label ? (
          <div className={styles.Header}>
            {label}
            <div className={styles.Actions}>
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}

        {placeholder ? children : <ul>{children}</ul>}
      </div>
    )
  }
)
