import React from 'react'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/app'
import { cn } from '@/lib/utils'

type MainLayoutProps = {
  width?: number
} & React.ComponentProps<'div'>

export const MobileOnlyLayout = ({ className, style, children, ...props }: MainLayoutProps) => {
  return (
    <main
      className={cn('mx-auto h-full', className)}
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
