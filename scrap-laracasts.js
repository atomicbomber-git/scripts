let body = document.querySelectorAll("body")
let list = document.querySelector("ol.episode-list.is-condensed")
let nodes = list.querySelectorAll(".episode-list-title a")
let node_array = []
let base_url = "https://laracasts.com"

for (var i = 0; i < nodes.length; ++i) {
    node_array.push(nodes[i]);
}

node_array = node_array.map(async (node) => {
    let response = await fetch(node.href)
    let container = document.createElement("div")
    container.innerHTML = await response.clone().text()
    let downloadButton = container.querySelector("video-card")
    return base_url + downloadButton.getAttribute("download-link")
})

let links = await Promise.all(node_array)
console.log(links.join("\n"))