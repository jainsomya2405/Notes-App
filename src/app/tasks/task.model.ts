export class Task {
  public id: number;
  public name: string;
  public createdDate: Date;

  constructor(id: number, name: string, date: Date) {
    this.id = id;
    this.name = name;
    this.createdDate = date;
  }
}
