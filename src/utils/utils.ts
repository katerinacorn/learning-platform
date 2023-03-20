export const sliceCourses = (courses: any[], page: number, pageSize: number): any[] => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return courses.slice(startIndex, endIndex);
};

export const sortDataByDate = (data: any[]): any[] => {
    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.launchDate).getTime();
        const dateB = new Date(b.launchDate).getTime();
        return dateB - dateA;
    });

    return sortedData;
};