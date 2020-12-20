import '../styles/globals.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../util/ApolloClient'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
