import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerFormComponent } from './dialogs/customer-form/customer-form.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteFormComponent } from './dialogs/delete-form/delete-form.component';

@Component({
  selector: 'app-customers',
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchTerm: string = '';
  responseData: any[] = [];

  constructor(private router: Router,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }
  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.responseData = data;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      }
    });
  }
  onLogout() {
    this.router.navigate(['/'], { replaceUrl: true }); // Clears navigation history
  }
  onAdd() {
    this.openDialog('add');
  }
  onEdit(item: any) {
    this.openDialog('edit', item);
  }
  openDialog(action: string, item?: any) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
      data: {
        action,
        customer: item || {}
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Added' : 'Updated'} Record Successfully...!!!`,
          'bottom',
          'center'
        );
      }
    });
  }
  onSearch() {
    if (this.searchTerm) {
      this.responseData = this.responseData.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.loadCustomers();
    }
  }
  onDelete(items: any) {
    // console.log('Delete clicked for customerId:', customerId);
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '400px',
      data: {
        customer: items,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'Deleted Record Successfully...!!!',
          'bottom',
          'center'
        );
        setTimeout(() => {
          this.loadCustomers();
        }, 300);
      }
    });
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onRefresh() {
    this.loadCustomers();
    this.searchTerm = '';
  }
}
