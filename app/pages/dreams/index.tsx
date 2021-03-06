import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDreams from "app/dreams/queries/getDreams"

const ITEMS_PER_PAGE = 100

export const DreamsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ dreams, hasMore }] = usePaginatedQuery(getDreams, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {dreams.map((dream) => (
          <li key={dream.id}>
            <Link href={Routes.ShowDreamPage({ dreamId: dream.id })}>
              <a>{dream.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const DreamsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Dreams</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDreamPage()}>
            <a>Create Dream</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DreamsList />
        </Suspense>
      </div>
    </>
  )
}

DreamsPage.authenticate = true
DreamsPage.getLayout = (page) => <Layout>{page}</Layout>

export default DreamsPage
