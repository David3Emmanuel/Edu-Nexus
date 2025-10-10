import { getFromApi, postToApi } from '@/app/actions/api.actions'
import {
  formatStrapiCollection,
  formatStrapiData,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from './client'

export interface Tag {
  id: number
  name: string
}

export const getTagByName = async (name: string): Promise<Tag | null> => {
  const res: StrapiCollectionResponse<Tag> = await getFromApi('/tags', {
    filters: {
      name: {
        $eq: name,
      },
    },
  })
  const formattedTags = formatStrapiCollection(res)
  return formattedTags.length > 0 ? formattedTags[0] : null
}

export const createTag = async (name: string): Promise<Tag> => {
  const res: StrapiSingleResponse<Tag> = await postToApi('/tags', { name })
  const formattedTag = formatStrapiData(res)
  if (!formattedTag) {
    throw new Error('Failed to create tag')
  }
  if (!formattedTag.id || typeof formattedTag.id !== 'number') {
    throw new Error('Created tag has no ID')
  }
  return formattedTag
}

export const processTags = async (tagNames: string[]): Promise<number[]> => {
  const tagIds: number[] = []
  for (const tagName of tagNames) {
    let tag = await getTagByName(tagName)
    if (!tag) {
      tag = await createTag(tagName)
    }
    tagIds.push(tag.id)
  }
  return tagIds
}
