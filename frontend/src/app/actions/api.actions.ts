'use server'

import { cookies } from 'next/headers'

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | QueryParamValue[]
  | { [key: string]: QueryParamValue }

const toQueryString = (params: Record<string, QueryParamValue>): string => {
  const parts: string[] = []
  const buildParams = (data: QueryParamValue, prefix: string = '') => {
    if (data === null || data === undefined) return

    if (Array.isArray(data)) {
      data.forEach((value, index) => {
        buildParams(value, `${prefix}[${index}]`)
      })
    } else if (typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        const newPrefix = prefix ? `${prefix}[${key}]` : key
        buildParams(data[key], newPrefix)
      })
    } else {
      parts.push(`${encodeURIComponent(prefix)}=${encodeURIComponent(data)}`)
    }
  }

  Object.keys(params).forEach((key) => {
    buildParams(params[key], key)
  })

  return parts.join('&')
}

async function authenticatedFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const jwt = (await cookies()).get('jwt')?.value
  const headers = new Headers(options.headers)

  if (jwt) {
    headers.set('Authorization', `Bearer ${jwt}`)
  }

  const url = new URL(`/api${path}`, STRAPI_URL)

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error.message || 'An error occurred.')
  }
  return res.json()
}

export async function getFromApi<T>(
  path: string,
  params?: Record<string, QueryParamValue>,
): Promise<T> {
  let fullPath = path
  if (params) {
    fullPath += `?${toQueryString(params)}`
  }
  return authenticatedFetch<T>(fullPath)
}

export async function postToApi<T>(path: string, data: object): Promise<T> {
  const isAuthRequest = path.startsWith('/auth/')
  const body = isAuthRequest ? JSON.stringify(data) : JSON.stringify({ data })

  console.log('data', data)
  console.log('body', body)

  return authenticatedFetch<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })
}
