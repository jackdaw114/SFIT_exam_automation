# API Documentation for Frontend Developers

This document outlines the available API endpoints, their purposes, and the required request format for each. Use this as a reference when integrating the frontend with the backend.

## Table of Contents
1. [Update Teacher Information](#update-teacher-information)
2. [Student Management](#student-management)
3. [Subject Management](#subject-management)
4. [Marks Management](#marks-management)
5. [Exam Management](#exam-management)
6. [Student Data Retrieval](#student-data-retrieval)
7. [Aggregate Data](#aggregate-data)

## Update Teacher Information

### Update Email
- **Endpoint**: POST `/updateemail`
- **Purpose**: Update a teacher's email address
- **Request Body**:
  ```json
  {
    "email": "current_email@example.com",
    "new_email": "new_email@example.com"
  }
  ```

### Update Phone Number
- **Endpoint**: POST `/updatenumber`
- **Purpose**: Update a teacher's phone number
- **Request Body**:
  ```json
  {
    "phoneNo": "current_phone_number",
    "new_phoneNo": "new_phone_number"
  }
  ```

### Update Username
- **Endpoint**: POST `/updatename`
- **Purpose**: Update a teacher's username
- **Request Body**:
  ```json
  {
    "username": "current_username",
    "new_username": "new_username"
  }
  ```

### Change Password
- **Endpoint**: POST `/changepassword`
- **Purpose**: Change a teacher's password
- **Request Body**:
  ```json
  {
    "password": "current_password",
    "new_password": "new_password"
  }
  ```

## Student Management

### Get Students
- **Endpoint**: GET `/getstudents`
- **Purpose**: Retrieve all students

## Subject Management

### Update Teacher Subject
- **Endpoint**: POST `/updateteachersubject`
- **Purpose**: Update or create a teacher's subject association
- **Request Body**:
  ```json
  {
    "subject_id": "subject_id",
    "teacher_id": "teacher_id",
    "practical": boolean,
    "oral": boolean,
    "term": boolean,
    "iat": boolean,
    "ese": boolean,
    "class": "class_name"
  }
  ```

### Get Teacher Subjects
- **Endpoint**: POST `/teachersubjects`
- **Purpose**: Retrieve subjects associated with a teacher
- **Request Body**:
  ```json
  {
    "teacher_id": "teacher_id"
  }
  ```

### Get Subject List
- **Endpoint**: GET `/subjectlist`
- **Purpose**: Retrieve all subjects

### Add Subject
- **Endpoint**: POST `/addsubject`
- **Purpose**: Add or update a subject
- **Request Body**:
  ```json
  {
    "subject_id": "subject_id",
    "subject_name": "subject_name",
    "branch": "branch_name"
  }
  ```

## Marks Management

### Update Student Marks
- **Endpoint**: POST `/update_data`
- **Purpose**: Update marks for multiple students
- **Request Body**:
  ```json
  {
    "updated_data": [
      {
        "pid": "student_pid",
        "marks": "marks_value"
      }
    ],
    "marks_type": "exam_type",
    "subject_id": "subject_id"
  }
  ```

### Create Student Marks
- **Endpoint**: POST `/create_student_marks`
- **Purpose**: Initialize marks for students in a subject
- **Request Body**:
  ```json
  {
    "subject": "subject_id",
    "semester": "semester",
    "class": "class_name",
    "teacher_id": "teacher_id",
    "subject_id": "subject_id",
    "marks_type": "exam_type"
  }
  ```

### Get Student Marks
- **Endpoint**: POST `/getdata`
- **Purpose**: Retrieve marks for students in a subject
- **Request Body**:
  ```json
  {
    "subject_id": "subject_id",
    "semester": "semester",
    "class_name": "class_name",
    "marks_type": "exam_type"
  }
  ```

## Exam Management

### Get Exams
- **Endpoint**: POST `/get_exams`
- **Purpose**: Retrieve exams associated with a teacher
- **Request Body**:
  ```json
  {
    "teacher_id": "teacher_id"
  }
  ```

### Lock Marks Entry
- **Endpoint**: POST `/lock_marks_entry`
- **Purpose**: Lock marks entry for a specific exam
- **Request Body**:
  ```json
  {
    "teacher_id": "teacher_id",
    "subject_id": "subject_id",
    "class": "class_name",
    "marks_type": "exam_type"
  }
  ```

## Student Data Retrieval

### Get Student Details
- **Endpoint**: POST `/get_student`
- **Purpose**: Retrieve details of a specific student
- **Request Body**:
  ```json
  {
    "pid": "student_pid"
  }
  ```

## Aggregate Data

### Get Aggregate Marks
- **Endpoint**: POST `/get_aggregate`
- **Purpose**: Retrieve aggregate marks data for subjects
- **Request Body**:
  ```json
  {
    "data_list": [
      {
        "subject": "subject_id",
        "class": "class_name",
        "marks_type": "exam_type"
      }
    ]
  }
  ```

Note: Make sure to handle errors appropriately in your frontend application, as some endpoints may return specific status codes or error messages in case of issues.
