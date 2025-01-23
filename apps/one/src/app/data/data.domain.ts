export type DataDomain = {
	id: string;
	items: DataDomainItem[];
}

type DataDomainItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
    }
};
