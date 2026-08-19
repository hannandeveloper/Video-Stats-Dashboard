const url1 = document.querySelector('#url1')
const url2 = document.querySelector('#url2')
const URLbtn = document.querySelector('#URLsubmit')
const vid1 = document.querySelector(".video1")
const needDes = document.querySelector("#needDescription")

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
    // add title
    const titleDiv = document.createElement("div")
    titleDiv.textContent = `Title : ${ytInfo.items[0].snippet.title}`
    titleDiv.classList.add("text-2xl")
    // add thumbnails 
    const thumbDiv = document.createElement("img")
    thumbDiv.src = ytInfo.items[0].snippet.thumbnails.medium.url
    // add channel title 
    const channelDiv = document.createElement("div")
    channelDiv.textContent = `Channel Title: ${ytInfo.items[0].snippet.channelTitle}`
    channelDiv.classList.add("text-2xl")
    // add tags 
    const tagDiv = document.createElement("div")
    tagDiv.textContent = `Tags  : ${ytInfo.items[0].snippet.tags}`
    // add views count 
    const viewsDiv = document.createElement("div")
    viewsDiv.textContent = `Views  : ${ytInfo.items[0].statistics.viewCount}`
    // add likes count 
    const likesDiv = document.createElement("div")
    likesDiv.textContent = `Likes  : ${ytInfo.items[0].statistics.likeCount}`
    // add comments count 
    const commentDiv = document.createElement("div")
    commentDiv.textContent = `Comments  : ${ytInfo.items[0].statistics.commentCount}`

    vid1.append(titleDiv, thumbDiv, channelDiv, tagDiv, viewsDiv, likesDiv, commentDiv)
    if (needDes.checked == true) {
        // add description  
        const desDiv = document.createElement("div")
        desDiv.textContent = `Description: ${ytInfo.items[0].snippet.description}`
        vid1.append(desDiv)
    }
})

// https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status,player&id=ls69oPi10iU&key=AIzaSyBR1hpK3fPOc9u3adkjIsZX3a3LrIKIDe4