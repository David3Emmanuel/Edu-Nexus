// Define generic Strapi types
export interface StrapiEntity<T> {
  id: number
  attributes: T
}

export interface StrapiCollectionResponse<T> {
  data: StrapiEntity<T>[]
}

export interface StrapiSingleResponse<T> {
  data: StrapiEntity<T>
}

export type FormattedStrapiItem<T> = T & { id: number }

export function formatStrapiData<T extends object>(
  apiResponse: StrapiEntity<T> | StrapiSingleResponse<T> | T | null | undefined,
) {
  if (apiResponse === null || apiResponse === undefined) {
    return apiResponse
  }

  // If it's a StrapiSingleResponse, unwrap the data
  if (
    typeof apiResponse === 'object' &&
    'data' in apiResponse &&
    apiResponse.data !== null &&
    typeof apiResponse.data === 'object' &&
    'id' in apiResponse.data &&
    'attributes' in apiResponse.data
  ) {
    return formatStrapiData(apiResponse.data as StrapiEntity<T>)
  }

  // If it's a StrapiEntity, flatten it
  if (
    typeof apiResponse === 'object' &&
    'id' in apiResponse &&
    'attributes' in apiResponse
  ) {
    const { id, attributes } = apiResponse as StrapiEntity<T>
    const result = {
      id,
      ...attributes,
    }
    // Recursively format nested objects/arrays within attributes
    for (const key in result) {
      if (key !== 'id') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value = (result as any)[key]
        if (typeof value === 'object' && value !== null) {
          value = formatStrapiData(value)
        } else if (Array.isArray(value)) {
          value = value.map((item) => formatStrapiData(item))
        }
      }
    }
    return result
  }

  // If it's already a flattened object (e.g., nested relation that was already formatted)
  if (typeof apiResponse === 'object') {
    const result = {
      ...(apiResponse as T),
    }
    for (const key in result) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value = (result as any)[key]
      if (typeof value === 'object' && value !== null) {
        value = formatStrapiData(value)
      } else if (Array.isArray(value)) {
        value = value.map((item) => formatStrapiData(item))
      }
    }
    return result
  }

  return apiResponse
}

export function formatStrapiCollection<T extends object>(
  apiResponse: StrapiCollectionResponse<T> | StrapiEntity<T>[],
): FormattedStrapiItem<T>[] {
  if (apiResponse === null || apiResponse === undefined) {
    return []
  }

  let itemsToFormat: StrapiEntity<T>[]

  if (Array.isArray(apiResponse)) {
    itemsToFormat = apiResponse
  } else if (
    typeof apiResponse === 'object' &&
    'data' in apiResponse &&
    Array.isArray(apiResponse.data)
  ) {
    itemsToFormat = apiResponse.data
  } else {
    return []
  }

  return itemsToFormat
    .map((item) => formatStrapiData(item))
    .filter(
      (item): item is FormattedStrapiItem<T> =>
        item !== null && item !== undefined,
    )
}
