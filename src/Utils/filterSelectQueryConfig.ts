import {QueryTypes, QueryOptionsWithType} from "sequelize";

export function filtersSelectQuery(nodeId: number, filter: string): QueryOptionsWithType<QueryTypes.SELECT> {
    return {
        replacements: {
            filter: `1 ${filter}`,
            nodeId: nodeId,
            period: filter == "day" ? "hour" : "day"
        },
        type: QueryTypes.SELECT
    }
}
