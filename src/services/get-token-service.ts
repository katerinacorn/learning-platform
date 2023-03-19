export const getToken = async () => {
    try {
        const response = await fetch('https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions');

        if (!response.ok) {
            throw new Error('Failed to get token');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred while getting token');
    }
};