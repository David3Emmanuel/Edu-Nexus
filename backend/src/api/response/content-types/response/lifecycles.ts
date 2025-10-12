module.exports = {
  async afterCreate(event) {
    const { result } = event
    const populated = (await strapi.entityService.findOne(
      'api::response.response',
      result.id,
      {
        populate: ['author', 'challenge'],
      },
    )) as any & { author: { id: number }; challenge: { id: number } }

    try {
      await strapi.entityService.create('api::activity.activity', {
        data: {
          type: 'response',
          response: result.id,
          challenge: populated.challenge.id,
          user: populated.author.id,
        },
      })
    } catch (error) {
      console.error('Error creating activity:', error)
    }
  },
}
