export default interface Connection {
  query<T>(query: string, params: any[]): Promise<T>;
  close: () => Promise<void>;
}
