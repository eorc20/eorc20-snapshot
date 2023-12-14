interface OpJson {
    p: string; // "eorc20"
    op: string; // "mint"
    tick: string; // "eoss"
    amt: string; // "10000"
}
interface OpList {
    id: number;
    protocol: string;
    tick: string;
    fromUser: string;
    toUser: string;
    opJson: string
}
interface Index {
    data: {
        total: number;
        opList: OpList[]
    }
}
async function getIndex(address: string) {
    const response = await fetch(`https://eorc20.com/api/tickOpHistory/page?pageSize=1&fromAddress=${address}&tick=eoss&opType=2`);
    return await response.json() as Index;
}

export async function getTotalFromIndex(address: string) {
    try {
        const index = await getIndex(address);
        return index.data.total;
    } catch (e) {
        console.error(e);
        return null;
    }
}
