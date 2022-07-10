interface ResponseData {
  _id: string;
}

interface TransformData {
  id: string;
}

interface GenresDataResponse {}

export const transformData = async <T extends ResponseData>(
  data: T[]
): Promise<any> =>
  data.reduce((acc, item) => {
    const result = {} as unknown as TransformData;
    Object.entries(item).forEach(([key, value]) => {
      if (key === "_id") {
        result.id = value;
      } else {
        result[key] = value;
      }
    });
    acc.push(result);
    return acc;
  }, []);

export const transformObject = async <T extends ResponseData>(
  data: T
): Promise<any> => {
  const result = {} as unknown as TransformData;
  Object.entries(data).forEach(([key, value]) => {
    if (key === "_id") {
      result.id = value;
    } else {
      result[key] = value;
    }
  });
  return result;
};

export const transformDataKey = (data, keyItem: string, newKey: string): any => {
  const formateData = {} as unknown as any;
  Object.entries(data).forEach(([key, value]) => {
    if (key === keyItem) {
      formateData[newKey] = value;
    } else {
      formateData[key] = value;
    }
  });
  return formateData;
};
