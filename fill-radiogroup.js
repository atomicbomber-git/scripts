let nodes = document.querySelectorAll("input[type=radio]:last-child")

for (let i = 0; i < nodes.length; ++i) {
    nodes[i].checked = true
}