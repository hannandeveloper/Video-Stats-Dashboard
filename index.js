const url1 = document.querySelector('#url1')
const url2 = document.querySelector('#url2')
const URLbtn = document.querySelector('#URLsubmit')

function getYouTubeVideoId(url) {
    // Regex pattern matching standard, shortened, embed, and shorts YouTube links
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    // Return the ID if it matches the standard 11-character length, otherwise null
    return (match && match[1].length === 11) ? match[1] : null;
}

URLbtn.addEventListener("click", async () => {
    let id = getYouTubeVideoId(url1.value)
    const baseURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status,player&id=${id}&key=AIzaSyBR1hpK3fPOc9u3adkjIsZX3a3LrIKIDe4`
    let info = await fetch(baseURL)
    let ytInfo = await info.json()
    if (ytInfo.items && ytInfo.items.length > 0) {
        console.log(`title is ${ytInfo.items[0].snippet.title}`)
    }
})