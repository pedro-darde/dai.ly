export default class LogError extends Error {
  constructor(...props: any) {
    super();
    this.message =
      "An error has been occurred while processing your action, contact system ADM for more info.";
    this.name = "LogError";
  }
}
