export default class Task {
  constructor(
    readonly id: number,
    readonly about: number,
    readonly expectedTime: number,
    readonly startAt: Date,
    readonly endedAt: Date | null = null,
    readonly timeSpent: number | null = null
  ) {}
}
