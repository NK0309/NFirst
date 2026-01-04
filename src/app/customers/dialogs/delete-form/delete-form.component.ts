import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-delete-form',
  imports: [],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.scss'
})
export class DeleteFormComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) { }
  onDelete() {
    console.log(this.data);
    const customerTodelete = this.data.customer.customerId;
    this.customerService.delete(customerTodelete).subscribe({
        next: () => {
        this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Delete Error:', error);
        },
      });
  }
  onCancel() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}
