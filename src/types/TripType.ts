
interface TripType {
    _id?: string;
    userID: string;
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    price: number;
    rating: number;
    countries: string[];
    isPublic: boolean;
    moreInfo: {
        _id?: string;
        [key: string]: any;
    }[];
}

export default TripType;