class entries {
    public static readonly durivi = 'durivi'
    public static readonly empyrean = 'empyrean'
    public static readonly origin = 'origin'

    isDurivi(entry: string): boolean {
        return entry === entries.durivi
    }

    isEmpyrean(entry: string): boolean {
        return entry === entries.empyrean
    }

    isOrigin(entry: string): boolean {
        return entry === entries.origin
    }
}

export default entries
