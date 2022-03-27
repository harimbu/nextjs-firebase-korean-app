import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Top from '../components/Top'
import Nav from '../components/Nav'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="px-6">
          <Top />
          <Nav />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
