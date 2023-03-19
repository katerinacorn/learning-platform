import { getToken } from "./get-token-service";

export const getCourses = async () => {
  try {
    const { token } = await getToken();
    const response = await fetch(`https://api.wisey.app/api/v1/core/preview-courses?token=${encodeURIComponent(token)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while fetching courses');
  }
};
