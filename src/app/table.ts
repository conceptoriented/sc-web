export class Table {
  constructor(id: string) {
    this.id = id;
    this.name = '';
    this.maxLength = -1;
  }

  id: string;
  name: string;

  maxLength: number;

  isPrimitve(): boolean {
    if(!this.name) return false;
    let n: string = this.name.toUpperCase();
    if(n === 'STRING' || n === 'DOUBLE' || n === 'INTEGER') return true;
    return false;
  }

  clone(): Table {
    let tab: Table = new Table(this.id);
    Object.assign(tab, this);
    return tab;
  }

  toJson(): string {
    return JSON.stringify(this);
  }
  static fromJsonObject(json: any): Table {
    let tab: Table = new Table('');

    tab.id = json.id;
    tab.name = json.name;

    tab.maxLength = json.maxLength;

    return tab;
  }
  static fromJsonList(json: any): Table[] {
    let tabs: Table[] = [];
    if(!json) return tabs;

    let tab: Table;
    for(let o of json) {
      tab = Table.fromJsonObject(o);
      tabs.push(tab);
    }

    return tabs;
  }

}

export class TableRef {

  constructor(id: string) {
    this.id = id;
  }

  id: string;
  table: Table;

  toJson(): string {
    return JSON.stringify(this);
  }
}
