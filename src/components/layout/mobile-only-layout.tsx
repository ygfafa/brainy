import React from 'react'

import { cn } from '@/lib/utils'

export const MAX_MOBILE_SCREEN_WIDTH = 440

type MainLayoutProps = {
  width?: number
} & React.ComponentProps<'div'>

export const MobileOnlyLayout = ({ className, style, children, ...props }: MainLayoutProps) => {
  return (
    <main
      className={cn(
        'mx-auto h-full shadow-[inset_-1px_0_0_rgba(0,0,0,0.1),inset_1px_0_0_rgba(0,0,0,0.1)]',
        className,
      )}
      style={{
        maxWidth: MAX_MOBILE_SCREEN_WIDTH,
        ...style,
      }}
      {...props}
    >
      {children}
    </main>
  )
}
