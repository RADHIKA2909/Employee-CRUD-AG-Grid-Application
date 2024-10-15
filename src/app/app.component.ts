import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

// The app heavily relies on Angular Material components for UI:
// MatToolbar, MatButton, MatDialog, MatTable, MatPaginator, MatSort, MatSnackBar, etc., are used to create a modern and responsive UI.
// Importing and configuring these components in AppModule allows them to be used across different components.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // displayedColumns: Defines the columns that will be displayed in the table.
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];

  // dataSource: A MatTableDataSource instance that holds the data that will be displayed in the table.
  dataSource!: MatTableDataSource<any>;

  // paginator and sort: Decorated with @ViewChild, these provide access to the Angular Material paginator and sorting functionalities.
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // This allows the app to use pagination by accessing the paginator from Angular Material.
  @ViewChild(MatSort) sort!: MatSort;     // This allows sorting on the table columns.

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  // openAddEditEmpForm(): Opens a dialog to add or edit an employee using the EmpAddEditComponent.
  // After the dialog is closed, checks if any data was returned, and if so, refreshes the employee list by calling getEmployeeList().
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList(); 
        }
      },
    });
  }

  // getEmployeeList(): Calls the EmployeeService to get the list of employees and sets up the table's data source.
  // Sets the dataSource with the fetched data (res) and attaches the paginator and sort to enable pagination and sorting.
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  // applyFilter(): Filters the table data based on user input.
  // Extracts the filter text from the input field, converts it to lowercase, and applies it to the dataSource.
  // If pagination is active, it resets to the first page when a new filter is applied.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // deleteEmployee(id): Deletes an employee record using the EmployeeService.
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  // openEditForm(data): Opens the dialog to edit the selected employee's details.
  // Opens a dialog (EmpAddEditComponent) with pre-filled data for editing an existing employee.
  // After the dialog is closed, checks if any changes were made, and if so, refreshes the employee list.
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
