export default class Task {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly about: string,
    readonly expectedTime: number,
    readonly startAt: Date,
    readonly status: number,
    readonly expectedDate: Date | null = null,
    readonly endedAt: Date | null = null,
    readonly timeSpent: number | null = null
  ) {}
}
