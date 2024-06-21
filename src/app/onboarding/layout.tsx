import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <nav className='w-full flex gap-4 justify-center'>
        <Link href="/onboarding">Intro</Link>
        <Link href="/onboarding/difficulty">Difficulty</Link>
        <Link href="/onboarding/form?difficulty=hard">Form</Link>
      </nav> */}
      {children}
    </>
  )
}