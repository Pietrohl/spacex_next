import { gql } from '@apollo/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/dist/client/router'
import { initializeApollo } from '../../util/ApolloClient'
import Loader from '../../components/Loader'
import styles from '../../styles/Launch.module.css'
import ReturnButton from '../../components/Button'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Details(props): JSX.Element {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }
  const { launch, loading } = props
  if (loading) return <Loader />

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.ten} />
            <col className={styles.ninety} />
          </colgroup>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>Name:</th>
              <td className={styles.td}>{launch.mission_name}</td>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <th className={styles.th}>Launch ID:</th>
              <td className={styles.td}>{launch.id}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Launch Site:</th>
              <td className={styles.td}>{launch.launch_site.site_name_long}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Mission Details:</th>
              <td className={styles.td}>{launch.details}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Vehicle:</th>
              <td className={styles.td}>{launch.rocket.rocket_name}</td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>Links:</th>

              <tr className={styles.tr}>
                <td className={styles.td}>Wikipedia:</td>
                <td className={styles.td}>
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wiki
                  </a>
                </td>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>Video:</td>
                <td className={styles.td}>
                  <a
                    href={launch.links.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube
                  </a>
                </td>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>Read:</td>
                <td className={styles.td}>
                  <a
                    href={launch.links.article_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SpaceflightNow
                  </a>
                </td>
              </tr>
            </tr>
          </tbody>
        </table>
        <div className={styles.imageRow}>
          {launch.links.flickr_images &&
            launch.links.flickr_images.map((element, i) => (
              <div key={i} className={styles.imageWrapper}>
                <img src={element} alt="" srcSet="" />
              </div>
            ))}
        </div>
      </div>
      <Link href={'/'}>
        <ReturnButton classStyle={styles.returnButton}>Return</ReturnButton>
      </Link>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const {
    data: { launchesPast }
  } = await apolloClient.query({
    query: gql`
      {
        launchesPast(limit: 10) {
          id
        }
      }
    `
  })
  const paths = launchesPast.map(element => {
    return {
      params: {
        launchId: element.id
      }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { launchId: id = '100' } = context.params
  const apolloClient = initializeApollo()
  const query = gql`
    query($id: ID!) {
      launch(id: $id) {
        id
        details
        launch_date_utc
        launch_date_local
        launch_site {
          site_name_long
        }
        launch_success
        links {
          article_link
          video_link
          wikipedia
          flickr_images
          mission_patch
          mission_patch_small
          presskit
        }
        mission_id
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
      }
    }
  `
  console.log('Fetching Launch....')
  const {
    loading,
    error = null,
    data: { launch = null }
  } = await apolloClient.query({ query: query, variables: { id: id } })
  console.log(`Got Launch ${id} info!`)

  return {
    revalidate: 20,
    props: {
      launch,
      loading,
      error
    }
  }
}
