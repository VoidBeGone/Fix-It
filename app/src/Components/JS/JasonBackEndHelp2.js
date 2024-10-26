



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
};