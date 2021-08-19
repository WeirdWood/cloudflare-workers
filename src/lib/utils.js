export const isListed = (uri, listing) => {
	var ret = false
	if (typeof uri == 'string') {
		listing.forEach(m => {
			if (uri.match(m) != null) ret = true
		})
	} else if (typeof uri == 'object' && uri) {
		ret = false
		let count = 0
		uri.forEach(url => {
			listing.forEach(m => {
				if (url.match(m) != null) count++
			})
		})
		if (count === uri.length) ret = true
	} else {
		//   decide what to do when Origin is null
		ret = false // true accepts null origins false rejects them.
	}
	return ret
}

export const whitelistOrg = ['gamezbd-info.pages.dev', '127.0.0.1']

export const whitelistUrl = [
	'forum.gameznetwork.com/forums/',
	'status.gamezbd.net/api/getMonitor/7DMKmfmWE6',
] // regexp for whitelisted urls