


//this place where I need to get data 
export default function searchQuery(searchResult, address, setSearchResults){
   //jason implement here thanks 
    fetch('/api/jobs/search?q='+searchResult).then(res => {
        if(res.ok) return res.json();
    })
    .then((data) => {
        setSearchResults(data); // Set the resolved data as search results
    })
    .catch((err) => {
        console.error('Fetch error:', err); // Log the error
        setSearchResults([]); // Set search results to an empty array in case of an error
    });


    //setSearchedResults([{id:"", title:"Title", image:"", description:"Penis", review:""}]); //make sure its an ARRAY
    //OR IT RETURN EMPTY OR ELSE CODE CRASH
};

