import UUID from "../vo/UUID";

export default class Publisher {
  private id: UUID;

  constructor(id: string, readonly name: string) {
    this.id = new UUID(id);

    if (!name) {
      throw new Error("Name must not be empty.");
    }
  }

  getId() {
    return this.id.getValue();
  }

  getName() {
    return this.name;
  }
}