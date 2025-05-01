
interface FormDataType {
    userID: string;
    title: string;
    description: string;
    price: number;
    startDate: string;
    endDate: string;
    rating: number;
    imageFormData: FormData;
    countries: string[];
    isPublic: boolean;
    moreInfo: {
        _id?: string;
        [key: string]: any;
    }[];
}

export default FormDataType;