import * as response from '../lib/responses'

export const route = '/bosses/(?<id>.+)'

const bossPost = async ({ params }) => {
	const boss = await BOSSES.get(params.id)
	return response.json(boss)
}

export default bossPost
