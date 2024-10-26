



export default function serviceQuery(someuserid, setSearchResults){
    fetch('/api/me/jobs')
    .then((res) => {
        // Check if the response is OK (status code in the range 200-299)
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json(); // Return the promise to chain the next then
    })
    .then((data) => {
        setSearchResults(data); // Set the resolved data as search results
    })
    .catch((err) => {
        console.error('Fetch error:', err); // Log the error
        setSearchResults([]); // Set search results to an empty array in case of an error
    });


    return;
    
    // setSearchResults([
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"PENIS", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""},
    //     {id:"", title:"Title", Description:"Description", Date:"2024-10-25", Progress:""}
    // ]);
};