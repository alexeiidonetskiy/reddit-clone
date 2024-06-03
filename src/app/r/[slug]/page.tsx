import { FC } from 'react'

interface pageProps {
  params: {
    slug: string
  }
}

const page: FC<pageProps> = ({ params: { slug } }) => {
  return <div>Page slug is: <b>{slug}</b></div>
}

export default page