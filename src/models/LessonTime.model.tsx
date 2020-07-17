export interface ILessonTime {
  startAt: string;
  endAt: string;

  num: number;
}

export class LessonTime implements ILessonTime {
  startAt: string;
  endAt: string;

  num: number;
  constructor(num: number) {
    this.num = num;
    switch (num) {
      case 1:
        this.startAt = "8:30";
        this.endAt = "10:10";
        break;
      case 2:
        this.startAt = "10:20";
        this.endAt = "12:00";
        break;
      case 3:
        this.startAt = "12:20";
        this.endAt = "14:00";
        break;
      case 4:
        this.startAt = "14:10";
        this.endAt = "15:50";
        break;
      case 5:
        this.startAt = "16:00";
        this.endAt = "17:40";
        break;
      case 6:
        this.startAt = "18:00";
        this.endAt = "19:30";
        break;
      case 7:
        this.startAt = "19:40";
        this.endAt = "21:10";
        break;
      case 8:
        this.startAt = "21:20";
        this.endAt = "22:50";
        break;
      default:
        this.startAt = "00:00";
        this.endAt = "00:00";
    }
  }
}
