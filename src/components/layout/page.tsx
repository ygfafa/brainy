import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

import { APP_BAR_HEIGHT, MAX_MOBILE_SCREEN_WIDTH } from '@/config/app'
import { cn } from '@/lib/utils'

export const Page = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen pb-8">{children}</div>
}

type PageAppBarWrapperProps = {
  children: React.ReactNode
  className?: string
}
const PageAppBarWrapper = ({ children, className }: PageAppBarWrapperProps) => {
  return (
    <header
      className={cn('fixed top-0 left-0 right-0 bg-white z-50 flex items-center px-4', className)}
      style={{ maxWidth: MAX_MOBILE_SCREEN_WIDTH, margin: '0 auto', height: APP_BAR_HEIGHT }}
    >
      {children}
    </header>
  )
}

type PageAppBarWithLogoProps = {
  right?: React.ReactNode
}
export const PageAppBarWithLogo = ({ right }: PageAppBarWithLogoProps) => {
  return (
    <PageAppBarWrapper className="justify-between pr-2">
      <h1 className="text-lg font-bold">Logo</h1>
      {right}
    </PageAppBarWrapper>
  )
}

type PageAppBarWithBackProps = {
  title?: React.ReactNode
}
export const PageAppBarWithBack = ({ title }: PageAppBarWithBackProps) => {
  const navigate = useNavigate()
  return (
    <PageAppBarWrapper className="pl-2">
      <button className="mr-3" onClick={() => navigate(-1)}>
        <IconArrowLeft />
      </button>
      <h2 className="font-semibold">{title}</h2>
    </PageAppBarWrapper>
  )
}
