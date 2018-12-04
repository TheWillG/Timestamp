export class Countdown {
  id: string;
  daysRemaining: number;
  dateTime: Date;
  description: string;
  past?: boolean;
  resets: Reset[];
  constructor(obj) {
    this.id = obj.id || '';
    this.daysRemaining = obj.daysRemaining || 0;
    this.dateTime = obj.dateTime || null;
    this.description = obj.description || '';
    this.resets = obj.resets || [];
  }
}
export class Reset {
  reason: string;
  startDate: Date;
  endDate: Date;
  constructor(obj) {
    this.reason = obj.reason || '';
    this.startDate = obj.startDate || null;
    this.endDate = obj.endDate || null;
  }
}
