'use client';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { ButtonProps, forwardRef } from '@chakra-ui/react';

export interface OutlineButtonProps extends PropsWithChildren {
  accent?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  square?: boolean;
}

const OutlineButton = (props: OutlineButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {
    leftIcon = null,
    rightIcon = null,
    accent = false,
    icon = null,
    children = null,
    square = false,
    className,
    ...otherProps
  } = props;

  const borderColorClass = accent
    ? `border-[var(--accent)]`
    : 'border-[var(--text-primary)]';

  const hoverBgClass = accent
    ? `hover:bg-[var(--accent-transparent)]`
    : 'hover:bg-[var(--text-primary-transparent)]';

  const squareClass = !square ? '' : 'aspect-square';

  return (
    <button
      {...otherProps}
      className={`flex items-center gap-2 rounded-xl border-2 ${borderColorClass} ${squareClass} px-4 py-2 transition ${hoverBgClass} ${className}`}
    >
      {children && leftIcon}
      {children}
      {children && rightIcon}
      {!children && icon}
    </button>
  );
};

export default OutlineButton;
