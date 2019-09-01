let list = document.querySelector("ol.episode-list.is-condensed")
let nodes = list.querySelectorAll(".episode-list-title a")
let node_array = []
let base_url = "https://laracasts.com"

for (var i = 0; i < nodes.length; ++i) {
    node_array.push(nodes[i]);
}

node_array = node_array.map(async (node) => {
    let response = await fetch(node.href)
    let response_text = await response.clone().text()
    let match = (/download-link="(.*?)"/g).exec(response_text)
    let path = match[1]
    return base_url + path
})

let links = await Promise.all(node_array)
console.log(links.join("\n"))