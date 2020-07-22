export class Task {
  public id: number;
  public name: string;
  public createdDate: Date;
  public description: string;

  constructor(id: number, name: string, date: Date, des: string) {
    this.id = id;
    this.name = name;
    this.createdDate = date;
    this.description = des;
  }
}
