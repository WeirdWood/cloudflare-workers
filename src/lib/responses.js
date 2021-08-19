import notFoundHtml from '../../html/404.html'

export const html = html =>
	new Response(html, {
		headers: {
			'content-type': 'text/html;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			Vary: 'Origin',
		},
	})

export const notFound = () =>
	new Response(notFoundHtml, {
		headers: { 'content-type': 'text/html' },
		status: 404,
	})

export const forbidden = html =>
	new Response(html, {
		status: 403,
		statusText: 'Forbidden',
		headers: {
			'Content-Type': 'text/html',
			'Access-Control-Allow-Origin': '*',
			Vary: 'Origin',
		},
	})

export const text = text =>
	new Response(text, {
		headers: { 'content-type': 'text/plain' },
	})

export const json = json =>
	new Response(json, {
		headers: {
			'content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			Vary: 'Origin',
		},
	})
