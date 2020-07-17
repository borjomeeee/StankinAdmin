export interface IGroup {
  id: string;
  title: string;

  lastUpdate: number;
}

export default class Group implements IGroup {
  id: string;
  title: string;
  lastUpdate: number;

  constructor(id: string, title: string, lastUpdate: number) {
    this.id = id;
    this.title = title;
    this.lastUpdate= lastUpdate;
  }
}
