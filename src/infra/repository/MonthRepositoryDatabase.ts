import Month from "../../domain/entity/Month";
import MonthRepository from "../../domain/repository/MonthRepository";
import Connection from "../database/Connection";

export default class MonthRepositoryDatabase implements MonthRepository {

    constructor(readonly connection: Connection) {}

    async list(): Promise<Month[]> {
        const monthData = await this.connection.query<any[]>("SELECT * FROM phd.months", []);
        const months: Month[] = []
        for (const month of monthData) {
            months.push(new Month(month.id, month.month_name, month.month_as_number))
        }
        return months
    }

    async reducedMonthValues(planningYear: number): Promise<any> {
        const data = await this.connection.query<{in_values: Array<number>, out_values: Array<number>, month_name: string}[]>(`
                    SELECT 
                        ARRAY(
                            (SELECT item.value
                            FROM phd.planning_month_item item
                                    INNER JOIN phd.planning_month pM ON pM.id = item.id_month_planning
                                    INNER JOIN phd.planning p ON p.id = pM.id_planning AND p.year = ${planningYear}
                            WHERE pM.id_month = month.id
                            AND item.operation = 'in')
                        ) AS in_values,
                        ARRAY(
                                (SELECT item.value
                                FROM phd.planning_month_item item
                                        INNER JOIN phd.planning_month pM ON pM.id = item.id_month_planning
                                        INNER JOIN phd.planning p ON p.id = pM.id_planning AND p.year = ${planningYear}
                                WHERE pM.id_month = month.id
                                AND item.operation = 'out')
                            ) AS out_values,
                        month.month_name
                FROM phd.months month
                    GROUP BY month.id`, []
        );

       return data.filter(item => item.in_values.length || item.out_values.length).map(item => {
        const totalIn = item.in_values.reduce((acc, current) => acc + current, 0);
        const totalOut = item.out_values.reduce((acc, current) => acc + current, 0)
            return {
                month: item.month_name,
                in: totalIn.toFixed(2),
                out: totalOut.toFixed(2),
                balance: (totalIn - totalOut).toFixed(2)
            }
       });
    }

    async stackedMonthWithItems(planningYear: number) : Promise<any> {
        let data = await this.connection.query<any>(`
                    SELECT month.month_name,
                    ARRAY(
                            (SELECT JSON_BUILD_OBJECT('values', ARRAY_AGG(CASE item.operation
                                                                            WHEN 'in' THEN item.value
                                                                            WHEN 'out' THEN item.value * -1 END),
                                                    'type_description', type.description
                                        )
                            FROM phd.planning_month_item item
                                    INNER JOIN phd.planning_month pM ON pM.id = item.id_month_planning
                                    INNER JOIN phd.planning p ON p.id = pM.id_planning AND p.year = $1
                                    INNER JOIN phd.item_type type ON type.id = item.id_type
                            WHERE pM.id_month = month.id
                            GROUP BY type.id)
                        ) items
            FROM phd.months month
            GROUP BY month.id;
        `, [planningYear])
        const typeLegends =  await this.connection.query("SELECT type.description FROM phd.item_type type", [])
        return{ info: data, typeLegends};
    }
}