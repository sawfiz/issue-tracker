import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <div>Hello
      <Pagination currentPage={5} totalItems={88} pageSize={10} />
    </div>
  )
}
