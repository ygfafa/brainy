import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

import { APP_BAR_HEIGHT, MAX_MOBILE_SCREEN_WIDTH } from '@/config/app'
import { cn } from '@/lib/utils'

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ maxWidth: MAX_MOBILE_SCREEN_WIDTH }}
      className="min-h-screen mx-auto flex flex-col items-stretch"
    >
      {children}
    </div>
  )
}

type PageAppBarWrapperProps = {
  children: React.ReactNode
  className?: string
}
const PageAppBarWrapper = ({ children, className }: PageAppBarWrapperProps) => {
  return (
    <header
      className={cn(
        'sticky w-full top-0 left-0 right-0 bg-white z-50 flex items-center px-4',
        className,
      )}
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
    <PageAppBarWrapper className="justify-between pr-2 h-full">
      <h1 className="text-lg font-bold"></h1>
      {/* <h1 className="text-lg font-bold">Logo</h1> */}
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
      <button className="mr-2 p-2" onClick={() => navigate(-1)}>
        <IconArrowLeft />
      </button>
      <h2 className="font-semibold">{title}</h2>
    </PageAppBarWrapper>
  )
}

type PageContentProps = {
  children: React.ReactNode
  noSidePadding?: boolean
}
export const PageContent = ({ children, noSidePadding = false }: PageContentProps) => {
  return <main className={cn('px-4 pb-8 flex-1', noSidePadding && 'px-0')}>{children}</main>
}
