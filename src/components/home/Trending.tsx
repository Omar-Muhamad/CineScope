import { FC } from "react"

type TrendingProps = { children: React.ReactNode }

const Trending: FC<TrendingProps> = ({children}) => {
  return (
    
      <ul className="w-full overflow-x-auto no-scrollbar flex gap-6 mt-6">{children}</ul>
  
  )
}
export default Trending