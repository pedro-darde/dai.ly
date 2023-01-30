export default interface BaseRepository {
    beginTransaction: () => Promise<void>
    commitTransaction: () => Promise<void>
    rollbackTransaction: () => Promise<void>
}