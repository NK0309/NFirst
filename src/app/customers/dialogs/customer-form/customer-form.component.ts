import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup | any;
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) {
    if (this.data.action === 'edit') {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customerId: [this.data.customer?.id || null],
      firstName: ['', Validators.required],
      lastName: [this.data.customer?.lastName || '', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      country: [''],
      state: [''],
      city: [''],
      createdOn: [this.data.customer?.createdOn || null],
      modifiedOn: [this.data.customer?.modifiedOn || null]
    });
    this.patchDetails();
  }
  patchDetails() {
    if (this.data.action === 'edit') {
      this.customerForm?.patchValue(this.data.customer);
      // console.log('Patching form with customer data:', this.data.customer);
      // console.log('Form value after patching:', this.customerForm.value);
    }
  }

  onSubmit() {
    const customerData = this.customerForm.getRawValue();

    if (this.isEditMode) {
      console.log('Updating customer:', customerData);
      this.customerService.update(customerData).subscribe({
        next: (response) => {
          this.dialogRef.close({ action: 'update', customer: customerData });
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        }
      });
    } else {
      console.log('Adding new customer:', customerData);
      if (customerData.state == 'string' || customerData.country == 'string' || customerData.city == 'string') {
        customerData.state = null;
        customerData.country = null;
        customerData.city = null;
      }
      this.customerService.create(customerData).subscribe({
        next: (response) => {
          this.dialogRef.close({ action: 'add', customer: customerData });
        },
        error: (error) => {
          console.error('Error creating customer:', error);
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}