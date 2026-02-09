import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const ShowMorePagination = ({length, total, page, totalPages, setPage}) => {
  return (
    <div className='text-black/50 flex items-center justify-center mt-10 gap-3'>
      {
        `Showing ${length} of ${total}`
      }
      {
        page < totalPages &&
        <Button
          onClick={() => {
            setPage((prev) => prev + 1)
          }}
          className={`
                                  ${"border-black/50 bg-transparent hover:bg-black/10 border-2"
            } 
                                  text-black/50 rounded-xl px-4 py-2 cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group/btn
                                `}
        >
          <span className="flex items-center gap-2">
            {'Show More'}
            <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
          </span>
        </Button>
      }
    </div>
  )
}

export default ShowMorePagination