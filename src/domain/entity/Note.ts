export default class Note {
  constructor(
    readonly description: string,
    readonly fixed: boolean = false,
    readonly created_at: Date = new Date()
  ) {}
}
