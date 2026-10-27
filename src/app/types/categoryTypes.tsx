export interface ICategory {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}