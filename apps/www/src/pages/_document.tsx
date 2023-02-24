import { Html, Head, Main, NextScript } from 'next/document'
import GTag from 'src/components/GTag/GTag'
import LMTScript from 'src/components/LMTScript/LMTScript'

const Document: React.FC = () => {
  return (
    <Html>
      <Head>
        <LMTScript />
      </Head>
      <body>
        <Main />
        <NextScript />
        <GTag />
      </body>
    </Html>
  )
}

export default Document
