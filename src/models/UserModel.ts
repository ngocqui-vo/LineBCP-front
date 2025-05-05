export class UserModel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  static fromApiResponse(data: any): UserModel {
    const { id, name } = data;
    return new UserModel(id, name);
  }
}
