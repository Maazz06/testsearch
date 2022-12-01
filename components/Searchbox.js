import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, refine }) => {
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         console.log(currentRefinement,"currentRefinement")
    //     }, 2000);
    // }, [currentRefinement])
    return(
     <div className="mb-4">
       <input
         className="shadow appearance-none border rounded
         w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         type="search"
         placeholder="Search"
         value={currentRefinement}
         onChange={(event) => refine(event.currentTarget.value)}
       />
     </div>
    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;