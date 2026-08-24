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
 const arrow = document.querySelector(".downArrow")
 arrow.style.visibility= "visible"
  getData()
})


async function getData() {
  let id1 = getYouTubeVideoId(url1.value)
  let id2 = getYouTubeVideoId(url2.value)
  const baseURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status,player&id=${id1},${id2}&key=AIzaSyBR1hpK3fPOc9u3adkjIsZX3a3LrIKIDe4`
  let info = await fetch(baseURL)
  let ytInfo = await info.json()

  ytInfo.items.forEach(id => {
    const sectionForEach = document.createElement("section")
    sectionForEach.className = "sm:w-2/5 w-[80%] flex item-center flex-col justify-center m-8 sm:m-20 border-2 border-[#C8A96B] p-2 rounded-lg"
    // add channel title 
    const channelDiv = document.createElement("div")
    channelDiv.textContent = `Channel Title:  ${id.snippet.channelTitle}`
    channelDiv.className = "text-2xl  text-[#F7F4ED] p-4"
    // add title 
    const titleDiv = document.createElement("div")
    titleDiv.textContent = `Title  : ${id.snippet.title}  `
    titleDiv.className = "text-[#F7F4ED] p-4"
    // add thumbnails 
    const thumbDiv = document.createElement("img")
    thumbDiv.src = id.snippet.thumbnails.maxres.url
    // add tags 
    const tagDiv = document.createElement("div")
    tagDiv.textContent = `Tags  : ${id.snippet.tags}`
    tagDiv.className = "text-[#F7F4ED] p-4"
    // add views count 
    const viewsDiv = document.createElement("div")
    let viCount = id.statistics.viewCount
    viewsDiv.textContent = `Views  : ${viCount}`
    viewsDiv.className = "text-[#F7F4ED] p-4"
    // add likes count 
    const likesDiv = document.createElement("div")
    let liCount = id.statistics.likeCount
    likesDiv.textContent = `Likes  : ${liCount}`
    likesDiv.className = " text-[#F7F4ED] p-4"
    // add comments count 
    const commentDiv = document.createElement("div")
    let comCount = id.statistics.commentCount
    commentDiv.textContent = `Comments  : ${comCount.toLocaleString()}`
    commentDiv.className = "text-[#F7F4ED] p-4"
    // add engagement rate 
    const engagementRate = ((Number(liCount) + Number(comCount)) / Number(viCount)) * 100
    const engagementDiv = document.createElement("div")
    engagementDiv.textContent = `Enagagement Rate : ${engagementRate.toFixed(2)}%`
    engagementDiv.className = "text-[#F7F4ED] p-4"


    sectionForEach.append(channelDiv, titleDiv, thumbDiv, tagDiv, viewsDiv, likesDiv, commentDiv, engagementDiv)
    if (needDes.checked == true) {
      // add description  
      const desDiv = document.createElement("div")
      desDiv.textContent = `Description: ${id.snippet.description}`
      sectionForEach.append(desDiv)
      desDiv.className = "text-[#F7F4ED] p-4"
    }
    // Call the external chart function

    const canvas1 = document.createElement("canvas")
    createMetricsChart(canvas1, viCount, liCount, comCount);

    sectionForEach.append(canvas1)

    vid1.append(sectionForEach)
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
          'rgb(200, 169, 107)',
          'rgb(200, 169, 107)',
          'rgb(200, 169, 107)'
        ],
        borderColor: [
          'rgb(247, 244, 237)',
          'rgb(247, 244, 237)',
          'rgb(247, 244, 237)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true, // <-- should be boolean, not string
      color: '#ffffff',
      plugins: {
        legend: {
          labels: { color: '#ffffff' }
        },
        title: {
          display: true,
          text: 'Video Metrics',
          color: '#C8A96B'
        },
        tooltip: { // added this so 50 doesn't show as 1e+2
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toLocaleString()
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#F7F4ED' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          type: 'logarithmic', // <-- KEY CHANGE
          min: 10,             // log can't be 0. Start at 10
          ticks: { 
            color: '#F7F4ED',
            // Show 10, 100, 1K, 10K, 100K, 1M instead of 10^1, 10^2
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000) + 'M'
              if (value >= 1000) return (value / 1000) + 'K'
              return value
            }
          },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    }
  });
}