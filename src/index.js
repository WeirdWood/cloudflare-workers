import Router from './lib/router'
import notFound from './pages/404'
import { getRoutes } from './lib/auto-routes'
import { isListed, whitelistOrg } from './lib/utils'

const routes = getRoutes()
const router = new Router()

routes.forEach(({ route, method, module }) => router[method](route, module))
router.all(notFound)

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	var orig = request.headers.get('Origin')

	if (
		new URL(request.url).pathname.match('/bosses/?') &&
		request.method === 'POST' &&
		orig === null
	) {
		const response = await router.route(request)
		return response
	} else if (isListed(orig, whitelistOrg)) {
		const response = await router.route(request)
		return response
	} else {
		return new Response('Your origin is not allowed to access this worker!', {
			status: 403,
			statusText: 'Forbidden',
			headers: {
				'Content-Type': 'text/html',
				'Access-Control-Allow-Origin': '*',
				Vary: 'Origin',
			},
		})
	}
}
