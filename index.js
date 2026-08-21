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
    let viCount = ytInfo.items[0].statistics.viewCount
    viewsDiv.textContent = `Views  : ${viCount}`
    // add likes count 
    const likesDiv = document.createElement("div")
    let liCount = ytInfo.items[0].statistics.likeCount
    likesDiv.textContent = `Likes  : ${liCount}`
    // add comments count 
    const commentDiv = document.createElement("div")
    let comCount = ytInfo.items[0].statistics.commentCount
    commentDiv.textContent = `Comments  : ${comCount}`
    // add engagement rate 
    const engagementRate = ((Number(liCount) + Number(comCount)) / Number(viCount)) * 100
    const engagementDiv = document.createElement("div")
    engagementDiv.textContent = `Enagagement Rate : ${engagementRate.toFixed(2)}%`

    vid1.append(titleDiv, thumbDiv, channelDiv, tagDiv, viewsDiv, likesDiv, commentDiv , engagementDiv)
    if (needDes.checked == true) {
        // add description  
        const desDiv = document.createElement("div")
        desDiv.textContent = `Description: ${ytInfo.items[0].snippet.description}`
        vid1.append(desDiv)
    }
    url1.value = ""
})

// https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status,player&id=ls69oPi10iU&key=AIzaSyBR1hpK3fPOc9u3adkjIsZX3a3LrIKIDe4