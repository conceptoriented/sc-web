import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Space } from './space';
import { Table, TableRef } from './table';
import { Column } from './column';
//import { TableDetailComponent } from './table-detail.component';

import { ScService } from './sc.service';

@Component({
  selector: 'sc-space',
  templateUrl: 'app/space.component.html',
  styleUrls:  ['app/space.component.css']
  //directives: [TableDetailComponent]
})
export class SpaceComponent implements OnInit {

  constructor(
    private _router: Router,
    private _scService: ScService) { }

  ngOnInit() {
    this.getSpaces()
    this.getTables()
    this.getColumns()
  }

  //
  // Space list
  //
  
  spaces: Space[];
  selectedSpace: Space;

  getSpaces() {
    this._scService.getSpaces().then(spaces => { this.spaces = spaces; this.selectedSpace = this.spaces[0]; });
  }

  //
  // Table list
  //
  
  tables: Table[];
  selectedTable: Table;

  getTables() {
    this._scService.getTables().then(tables => this.tables = tables);
  }

  onSelectTable(table: Table) { 
    this.selectedTable = table; 
    this.selectedColumn = undefined; 
    this.getColumns();
  }

  //
  // Column list
  //
  
  columns: Column[];
  selectedColumn: Column;

  getColumns() {
    if(!this.selectedTable) return new Array<Column>()
    this._scService.getInputColumns(this.selectedTable.id).then(
      columns => { this.columns = columns; this.resolveColumns(); }
      );
  }

  resolveColumn(column: Column) { // Resolve all reference from the specified column 

    // Resolve input table reference
    if(!column.input_ref || !column.input_ref.id) {
      column.input_ref.table = undefined
    }
    else {
      column.input_ref.table = this.tables.find(t => t.id === column.input_ref.id)
    }

    // Resolve output table reference
    if(!column.output_ref || !column.output_ref.id) {
      column.output_ref.table = undefined
    }
    else {
      column.output_ref.table = this.tables.find(t => t.id === column.output_ref.id)
    }

  }
  resolveColumns() {
    for(let column of this.columns) {
      this.resolveColumn(column);
    }
  }

  onSelectColumn(column: Column) {
    if(column) { // Edit existing column
      //this.selectedColumn = column;
      this.selectedColumn = (JSON.parse(JSON.stringify(column))) // Copy object for editing
    }
    else { // Create new column
      let col = new Column()
      col.id = ""
      col.name = "New Column"
      col.input_ref = new TableRef(this.selectedTable.id)
      col.input_ref.table = this.selectedTable
      let type = this.tables.find(t => t.name === "String")
      col.output_ref = new TableRef(type.id)
      col.output_ref.table = type

      this.selectedColumn = col
    } 
  }

  //
  // Column details
  //
  
  onColumnSubmit() { 
    if(this.selectedColumn.id.length === 0) {
      // Add new column
      this._scService.addColumn(this.selectedColumn)
    }
    else {
      // Update rexisting column
      this._scService.updateColumn(this.selectedColumn)
    }

    // Clear the selected object (we want to load it again after update)
    let id = this.selectedColumn.id
    this.selectedColumn = null

    // Update the view by loading again all the columns (or updating only one of them)
    this.getColumns();
    // We could also trigger column list update by selecting the current table

    // Set selection again
    //let col = this.columns.find(c => c.id === id)
    //this.onSelectColumn(col)
  }

  gotoDetail() {
    this._router.navigate(['TableDetail', { id: this.selectedTable.id }]);
  }

}
