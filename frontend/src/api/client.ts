

export function formatStrapiData(apiResponse: any): any {
  if (apiResponse === null || apiResponse === undefined) {
    return apiResponse;
  }

  if (Array.isArray(apiResponse)) {
    return apiResponse.map(item => formatStrapiData(item));
  }

  if (typeof apiResponse === 'object') {
    if ('data' in apiResponse && (apiResponse.data === null || 'id' in apiResponse.data || Array.isArray(apiResponse.data))) {
       return formatStrapiData(apiResponse.data);
    }
    
    let result: any = {};
    if ('id' in apiResponse && 'attributes' in apiResponse) {
      result = {
        id: apiResponse.id,
        ...apiResponse.attributes,
      };
    } else {
      result = apiResponse;
    }

    for (const key in result) {
      result[key] = formatStrapiData(result[key]);
    }
    return result;
  }

  return apiResponse;
}

export function formatStrapiCollection(items: any) {
    if (!items) return [];
    return formatStrapiData(items);
}