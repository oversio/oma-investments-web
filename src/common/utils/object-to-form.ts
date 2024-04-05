export const objectToForm = (obj: Record<string, boolean | string | number | File>) => {
  const formData = new FormData();

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    formData.set(key, value instanceof File || typeof value === "string" ? value : value.toString());
  }

  return formData;
};
