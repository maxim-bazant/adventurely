
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()}. ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
};