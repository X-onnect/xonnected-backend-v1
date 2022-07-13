export declare class PostDto {
    text: string;
    image: string;
    likes: string[];
    createdAt: string;
    createdBy: string;
    comments: PostDto[];
    isFree: boolean;
    price: number;
    subscribersFromCreator: string[];
    subscribers: string[];
}
