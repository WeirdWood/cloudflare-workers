import * as response from '../lib/responses'

export const route = '/bosses/?'
export const method = 'post'

const bossPost = async request => {
	const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY)

	if (psk === PRESHARED_AUTH_HEADER_VALUE) {
		// Correct preshared header key supplied. Fetch request from origin.
		const { name, contents } = await request.json()
		await BOSSES.put(name, contents)
		return response.html('SUCCESS')
	}

	// Incorrect key supplied. Reject the request.
	return response.notFound()
}

export default bossPost
