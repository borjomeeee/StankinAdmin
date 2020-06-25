export interface IGroup {
  id: number;
  title: string;
}

export default class Group implements IGroup {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
