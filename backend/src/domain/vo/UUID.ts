import crypto from "crypto";

export default class UUID {
  private value: string;

  constructor(uuid: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
      throw new Error("Invalid UUID format");
    }
    this.value = uuid;
  }

  static create() {
    const uuid = crypto.randomUUID();
    return new UUID(uuid);
  }

  getValue() {
    return this.value;
  }
}
