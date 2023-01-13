import {promises as fs} from 'fs';
import path from "path";

export type SlugIdPairMap = { [key: string]: string };

export const FsCache = {
    get: async (slug: string): Promise<string | null | undefined> => {
        const data = await fs.readFile(path.join(process.cwd(), 'path-cache.db'));
        const products: SlugIdPairMap = JSON.parse(data as unknown as string);
        return products[slug];
    },
    set: async (slugIdPairMap: SlugIdPairMap) => {
        return await fs.writeFile(
            path.join(process.cwd(), 'path-cache.db'),
            JSON.stringify(slugIdPairMap)
        );
    },
};