## tailwind dark mode

1. tailwind.config.js

```
module.exports = {
  darkMode: 'class',
  ...
}
```

2. \_app.js

```
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

3. install 'next-themes'

```
import { useTheme } from 'next-themes'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    ....

    <div onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon className="w-7 h-7" /> : <MoonIcon className="w-7 h-7" />}
    </div>
    ...
  )
}
```
