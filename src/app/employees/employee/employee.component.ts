import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service'
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm()
  }
  onSubmit(form: NgForm){
    if(form.value.$key == '')
      this.employeeService.insertEmployee(form.value);
    else
      this.employeeService.updateEmployee(form.value);
    this.resetForm(form);
  }
   resetForm(form: NgForm){
    if(form != null)
      form.reset(); 
    this.employeeService.selectedEmployee = {
       $key: '',
       name: '',
       designation: '',
       office: '',
       salary: 0,
     }
   }

   onDelete(form: NgForm) {
     if(confirm('Are you sure you want to delete this record?'))
     {
       this.employeeService.deleteEmployee(form.value.$key)
       this.resetForm(form);
     }
   }
}
