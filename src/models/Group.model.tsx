export interface IGroup {
  id: string;
  title: string;
}

export default class Group implements IGroup {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
