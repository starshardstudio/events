function renderTime() {
	const root = document.querySelector("html")
	const now = new Date()

	for(const element of document.querySelectorAll('time[data-render]')) {
		const format = element.getAttribute("data-render")
		const date = new Date(element.dateTime)

		if(format === "relative-short") {
            const renderer = new Intl.RelativeTimeFormat(root.lang, {style: "short"})
			const deltaMs = date - now
			const absMs = Math.abs(deltaMs)
            if(absMs <= 1000 * 300) element.innerText = renderer.format(Math.floor(deltaMs / (1000)), "second")
            else if(absMs <= 1000 * 60 * 90) element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60)), "minute")
            else if(absMs <= 1000 * 60 * 60 * 24) element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60 * 60)), "hour")
			else element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60 * 60 * 24)), "day")
		}
		else if(format === "relative-long") {
			const renderer = new Intl.RelativeTimeFormat(root.lang, {style: "long", numeric: "auto"})
			const deltaMs = date - now
			const absMs = Math.abs(deltaMs)
			if(absMs <= 1000 * 300) element.innerText = renderer.format(Math.floor(deltaMs / (1000)), "second")
			else if(absMs <= 1000 * 60 * 90) element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60)), "minute")
			else if(absMs <= 1000 * 60 * 60 * 24) element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60 * 60)), "hour")
			else element.innerText = renderer.format(Math.floor(deltaMs / (1000 * 60 * 60 * 24)), "day")
		}
		else if(format === "datetime") {
            const renderer = new Intl.DateTimeFormat(root.lang, {weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: false})
            element.innerText = renderer.format(date)
		}
        else if(format === "date") {
            const renderer = new Intl.DateTimeFormat(root.lang, {day: "numeric", month: "numeric", year: "numeric"})
            element.innerText = renderer.format(date)
        }
	}
}

window.onload = function() {
	renderTime()
    setInterval(renderTime, 60000)
}
