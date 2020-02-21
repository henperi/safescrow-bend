export const trimifyPayload = (payload: Record<string, string>): Record<string, string> => {
  const data: Record<string, string> = {};

  Object.keys(payload).map(key => {
    data[key] = payload[key].trim();

    return data;
  });

  return data;
};
