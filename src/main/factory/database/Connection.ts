import PgPromiseAdapter from "../../../infra/database/PgPromiseAdapter"

export const makeDBConnection = () => {
    return new PgPromiseAdapter()
}