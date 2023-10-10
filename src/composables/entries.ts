class entries {
    public static readonly duviri = 'duviri'
    public static readonly empyrean = 'empyrean'
    public static readonly origin = 'origin'

    isduviri(entry: string): boolean {
        return entry === entries.duviri
    }

    isEmpyrean(entry: string): boolean {
        return entry === entries.empyrean
    }

    isOrigin(entry: string): boolean {
        return entry === entries.origin
    }
}

export default entries
