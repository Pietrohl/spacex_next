import { gql, useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import Button from '../components/Button'
import LaunchCard from '../components/LaunchCard'
import ScrollTopBtn from '../components/ScrollTopBtn'
import styles from '../styles/Home.module.css'
import { initializeApollo } from '../util/ApolloClient'
enum Sections {
  None,
  Past,
  Future
}

const GET_NEW_PAST = gql`
  query LaunchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      details
    }
  }
`
const GET_NEW_UPCOMING = gql`
  query LaunchesUpcoming($limit: Int!, $offset: Int!) {
    launchesUpcoming(limit: $limit, offset: $offset) {
      id
      mission_name
      details
    }
  }
`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home({ launchesPast, launchesUpcoming }) {
  const [section, setSection] = useState<Sections>(Sections.None)
  const [loading, setLoading] = useState<boolean>(false)
  const [arrPast, setArrPast] = useState(launchesPast)
  const [arrUpcoming, setArrUpcoming] = useState(launchesUpcoming)
  const [page, setPage] = useState<number>(1)

  const { fetchMore: fetchPast } = useQuery(GET_NEW_PAST, {
    variables: {
      offset: 0,
      limit: 10
    }
  })
  const { fetchMore: fetchUpcoming } = useQuery(GET_NEW_UPCOMING, {
    variables: {
      offset: 0,
      limit: 10
    }
  })

  const LoadMore = async (section: Sections) => {
    setPage(page + 1)
    setLoading(true)
    if (section === Sections.Future) {
      fetchUpcoming({
        variables: {
          offset: page * 10,
          limit: 10
        }
      }).then(results => {
        setArrUpcoming([...arrUpcoming, ...results.data.launchesUpcoming])
        setLoading(results.loading)
      })
    } else if (section === Sections.Past) {
      fetchPast({
        variables: {
          offset: page * 10,
          limit: 10
        }
      }).then(results => {
        setArrPast([...arrPast, ...results.data.launchesPast])
        setLoading(results.loading)
      })
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js SpaceX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Welcome to <a>SpaceX by Next.js</a>
          </h1>
          <p className={styles.description}>Find out about SpaceX launches</p>
        </header>
        <Button
          hidden={section === Sections.None}
          onClick={() => [
            setSection(Sections.None),
            setPage(0),
            setArrPast(launchesPast),
            setArrUpcoming(launchesUpcoming)
          ]}
          classStyle={styles.returnButton}
        >
          Return
        </Button>

        <div className={styles.grid}>
          <a
            hidden={section !== Sections.None}
            aria-hidden={section !== Sections.None}
            className={styles.selectionCard}
            onClick={() => setSection(Sections.Past)}
          >
            <h3>Past Launches &rarr;</h3>
            <p>Take a look at the past launches by SpaceX</p>
          </a>
          <a
            hidden={section !== Sections.None}
            aria-hidden={section !== Sections.None}
            className={styles.selectionCard}
            onClick={() => setSection(Sections.Future)}
          >
            <h3>Next Launches &rarr;</h3>
            <p>Find out about SpaceX next launches</p>
          </a>
        </div>
        <div className={styles.launchesGrid}>
          {arrUpcoming.map((element, i) => {
            return (
              <LaunchCard
                key={element.id + `${i}`}
                element={element}
                className={styles.launchCard}
                hidden={section !== Sections.Future}
              />
            )
          })}

          {arrPast.map((element, i) => {
            return (
              <LaunchCard
                key={element.id + `${i}`}
                element={element}
                className={styles.launchCard}
                hidden={section !== Sections.Past}
              />
            )
          })}

          {/* Load More Button */}
          <Button
            hidden={section === Sections.None}
            onClick={() => LoadMore(section)}
          >
            {!loading && 'Load More'}
            <PulseLoader
              css={''}
              size={20}
              color={'#123abc'}
              loading={loading}
            />
          </Button>
        </div>
        <ScrollTopBtn classStyle={styles.scrollTopBtn} />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </footer> */}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { error = null, data } = await apolloClient.query({
    query: gql`
      {
        launchesPast(limit: 10) {
          id
          mission_name
          details
        }
        launchesUpcoming(limit: 10) {
          id
          mission_name
          details
        }
      }
    `
  })

  const { launchesPast, launchesUpcoming } = data

  return {
    props: {
      launchesPast,
      launchesUpcoming,
      error
    },
    revalidate: 10
  }
}
