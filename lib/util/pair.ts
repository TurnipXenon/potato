export interface Pair<K, V> {
    key: K;
    value: V;
}

export interface StringMap {
    [key: string]: string;
};

export const fromStringMapToPairArray = (o: StringMap): Pair<string, string>[] => {
    const keys = Object.keys(o);
    const l: Pair<string, string>[] = [];
    for (const k of keys) {
        l.push({
            key: k,
            value: o[k]
        });
    }
    return l;
};

export const fromPairArrayToStringMap = (pl: Pair<string, string>[]): StringMap => {
    const s: StringMap = {};
    for (const p of pl) {
        s[p.key] = p.value;
    }
    return s as StringMap;
};
