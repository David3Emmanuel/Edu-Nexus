module.exports = {
  async afterCreate(event) {
    const { result } = event
    const populated = (await strapi.entityService.findOne(
      'api::challenge.challenge',
      result.id,
      {
        populate: ['author'],
      },
    )) as any & { author: { id: number } }

    try {
      await strapi.entityService.create('api::activity.activity', {
        data: {
          type: 'challenge',
          challenge: result.id,
          user: populated.author.id,
        },
      })
    } catch (error) {
      console.error('Error creating activity:', error)
    }
  },
}
