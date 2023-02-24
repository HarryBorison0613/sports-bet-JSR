import '../src/styles/index.css'
import '../src/styles/prism-ghcolors.css'
import '../src/styles/_header.scss'
import '../src/styles/_home.scss'
import '../src/styles/_posts.scss'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-NXJHB2M',
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
