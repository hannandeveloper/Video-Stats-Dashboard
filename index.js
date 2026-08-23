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

URLbtn.addEventListener("click", () => {
    getData()
})


async function getData() {
    let id1 = getYouTubeVideoId(url1.value)
    let id2 = getYouTubeVideoId(url2.value)
    const baseURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status,player&id=${id1},${id2}&key=AIzaSyBR1hpK3fPOc9u3adkjIsZX3a3LrIKIDe4`
    let info = await fetch(baseURL)
    let ytInfo = await info.json()

    ytInfo.items.forEach(id => {
        // add channel title 
        const channelDiv = document.createElement("div")
        channelDiv.textContent = `Channel Title: ${id.snippet.channelTitle}`
        channelDiv.classList.add("text-2xl")
        // add title 
        const titleDiv = document.createElement("div")
        titleDiv.textContent = `Title  : ${id.snippet.title}  `
        titleDiv.classList.add("text-2xl")
        // add thumbnails 
        const thumbDiv = document.createElement("img")
        thumbDiv.src = id.snippet.thumbnails.medium.url
        // add tags 
        const tagDiv = document.createElement("div")
        tagDiv.textContent = `Tags  : ${id.snippet.tags}`
        // add views count 
        const viewsDiv = document.createElement("div")
        let viCount = id.statistics.viewCount
        viewsDiv.textContent = `Views  : ${viCount}`
        // add likes count 
        const likesDiv = document.createElement("div")
        let liCount = id.statistics.likeCount
        likesDiv.textContent = `Likes  : ${liCount}`
        // add comments count 
        const commentDiv = document.createElement("div")
        let comCount = id.statistics.commentCount
        commentDiv.textContent = `Comments  : ${comCount.toLocaleString()}`
        // add engagement rate 
        const engagementRate = ((Number(liCount) + Number(comCount)) / Number(viCount)) * 100
        const engagementDiv = document.createElement("div")
        engagementDiv.textContent = `Enagagement Rate : ${engagementRate.toFixed(2)}%`



        vid1.append(channelDiv, titleDiv, thumbDiv, tagDiv, viewsDiv, likesDiv, commentDiv, engagementDiv)
        if (needDes.checked == true) {
            // add description  
            const desDiv = document.createElement("div")
            desDiv.textContent = `Description: ${id.snippet.description}`
            vid1.append(desDiv)
        }
        // Call the external chart function

        const canvas1 = document.createElement("canvas")
        createMetricsChart(canvas1, viCount, liCount, comCount);
              vid1.append(canvas1)
              
      
    });
    url1.value = ""
    url2.value = ""
}

// Extracted Helper Function for Chart Integration
// Function ko updated parameters dein
function createMetricsChart(canvasElement, viCount, liCount, comCount) {
    // Check karein agar is canvas par pehle se chart exist karta hai
    const existingChart = Chart.getChart(canvasElement);
    if (existingChart) {
        existingChart.destroy(); // Purana chart destroy karein
    }

    return new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: ['Views', 'Likes', 'Comments'],
            datasets: [{
                label: 'Video Metrics',
                data: [viCount, liCount, comCount],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Statistics Overview'
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    beginAtZero: true
                }
            }
        }
    });
}
