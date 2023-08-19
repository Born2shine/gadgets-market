'use client'
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "react-js-pagination";

const CustomPagination = ({resPerPage, productsCount}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    let page = searchParams.get('page') * 1 || 1
    
    let queryParams

const handlePageChange = (curPage)=>{
    if(typeof window !== 'undefined'){
        queryParams = new URLSearchParams(window.location.search)

        if(queryParams.has('page')){
            queryParams.set('page', curPage)
        }else{
            queryParams.append('page', curPage)
        }

        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path)
    }
}

return ( 
<div className="flex mt-20 justify-center">
    <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={handlePageChange}
            nextPageText= {"Next"}
            prevPageText= {"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="relative inline-flex items-center border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 "
            activeClass="z-10 inline-flex items-center border-indigo-500 gb-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
            activeLinkClassName="z-10 inline-flex items-center border-indigo-500 gb-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
            />
</div> );
}
 
export default CustomPagination;