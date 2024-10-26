



export default function serviceQuery(someuserid, setSearchResults){
    fetch('/api/me/jobs')
        .then((jobs) => {
            setSearchResults(jobs);
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        }
    );

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