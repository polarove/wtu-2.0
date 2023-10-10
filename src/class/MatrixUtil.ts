export class MatrixUtil<T> {
    public rows: Array<T>

    constructor(...rows: Array<T>) {
        this.rows = rows
    }

    columns() {
        // @ts-ignore
        return this.rows[0].map((_: any, c: any) =>
            this.rows.map((r: any) => r[c])
        )
    }
}
