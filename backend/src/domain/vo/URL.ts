export default class URL {
  private readonly value: string;

  constructor(value: string) {
    if (!URL.isValid(value)) {
      throw new Error(`Invalid URL: ${value}`);
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  private static isValid(url: string): boolean {
    try {
      const parsedUrl = new globalThis.URL(url);

      const validProtocols = ["http:", "https:"];
      if (!validProtocols.includes(parsedUrl.protocol)) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
