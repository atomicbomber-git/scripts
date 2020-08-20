let promises = [...document.querySelectorAll("ul.list-none li a")]
    .map(node => node.href)
    .filter(href => href.startsWith("https://laravel-livewire.com/screencasts"))
    .map(href => {
        let domParser = new DOMParser()
        return fetch(href)
            .then(response => response.text())
            .then(html => domParser.parseFromString(html, "text/html"))
            .then(dom => dom.querySelector("iframe"))
            .then(element => element.src)
    })

Promise.all(promises)


