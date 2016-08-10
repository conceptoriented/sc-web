import { Table } from './table';

export class Schema {
  constructor(id: string) { 
    this.id = id;
    this.name = "";
  }

  id: string;
  name: string;

  clone(): Schema {
    let sch: Schema = new Schema(this.id);
    Object.assign(sch, this);
    return sch;
  }

  toJson(): String {
    return JSON.stringify(this);
  }
  static fromJsonObject(json: any): Schema {
    let sch: Schema = new Schema("");

    sch.id = json.id;
    sch.name = json.name;

    return sch;
  }
  static fromJsonList(json: any): Schema[] {
    let schs: Schema[] = [];
    if(!json) return schs;

    let sch: Schema;
    for(let o of json) {
      sch = Schema.fromJsonObject(o);
      schs.push(sch);
    }

    return schs;
  }

}
