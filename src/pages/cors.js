import { whitelistUrl, isListed } from '../lib/utils'
import * as response from '../lib/responses'

async function textWIthUrl(response) {
	// we only want responses which are text
	if (
		response.headers
			.get('content-type')
			.toLowerCase()
			.startsWith('text/') ||
		response.headers
			.get('content-type')
			.toLowerCase()
			.startsWith('application/json')
	) {
		let okstatus = await response.ok
		let urlval = await response.url
		let newval =
			"<a class='multicorsproxy' href='" + urlval + "'>" + okstatus + '</a>'
		let res = await response.text()

		return newval + res
	}
	return ''
}

export const route = '/cors/?'
export const method = 'post'

const cors = async request => {
	let requestText = await request.clone().text()
	// Emulating the request received
	let browserrequest = new Request(request)

	browserrequest.headers.delete('Origin')
	browserrequest.headers.delete('referer')
	let responsearr = []
	let urlArr = JSON.parse(requestText)
	let results = ''

	if (isListed(urlArr, whitelistUrl)) {
		for (var url of urlArr) {
			var fetchRes = fetch(url, {
				headers: browserrequest.headers,
			})
				.then(response => textWIthUrl(response))
				.then(data => (results = results.concat(data)))
				.catch(error =>
					results.concat(
						"<a class='multicorserror'>" + error.toString() + '</a>',
					),
				)
			responsearr.push(fetchRes)
		}

		return await Promise.allSettled(responsearr).then(() => {
			return response.html(results)
		})
	} else {
		return response.forbidden('Your URLs are not allowed for this CORS server!')
	}
}

export default cors
