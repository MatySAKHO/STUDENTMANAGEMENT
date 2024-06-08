import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, Sexe, Classe, Serie } from './student.model';
  import { ApiService } from '../share/students.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/students';

  showAdd!: boolean;
  showUpdate!: boolean;
  studentModelObj: Student = new Student();
  formValue!: FormGroup;
  allStudents!: any[];

  //constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  constructor(private formBuilder: FormBuilder, private api: ApiService, private httpClient: HttpClient) { }
  

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      classe: ['', Validators.required],
      serie: ['', Validators.required] // Added serie field
    });
    this.getData();
  }

  addStudentForm() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  editStudentForm(student: Student) {
    this.showUpdate = true;
    this.showAdd = false;
    this.studentModelObj = { ...student };
    this.formValue.setValue({
      prenom: student.prenom,
      nom: student.nom,
      sexe: student.sexe,
      dateNaissance: student.dateNaissance,
      classe: student.classe,
      serie: student.serie // Set serie value
    });
  }

  updateStudent() {
    this.studentModelObj = { ...this.formValue.value, id: this.studentModelObj.id };
    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe({
        next: (res) => {
          this.formValue.reset();
          this.getData();
          alert("Student updated successfully");
        },
        error: () => {
          alert("Failed to update student");
        }
      });
  }

  addStudent() {
    this.studentModelObj = { ...this.formValue.value };
    this.api.postStudent(this.studentModelObj).subscribe({
      next: (res) => {
        console.log(res);
        this.formValue.reset();
        alert("Student added successfully");
        this.getData();
      },
      error: () => {
        alert("Failed to add student");
      }
    });
  }

  getData() {
    this.api.getStudents().subscribe({
      next: (res: any[]) => {
        this.allStudents = res;
      },
      error: () => {
        alert("Failed to fetch students");
      }
    });
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.prenom}?`)) {
      this.api.deleteStudent(student.id).subscribe({
        next: (res) => {
          alert("Student deleted successfully");
          this.getData();
        },
        error: () => {
          alert("Failed to delete student");
        }
      });
    }
  }

  fetchData(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiUrl);
  }
}
