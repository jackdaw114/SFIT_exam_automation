# API Documentation for Admin Routes (admin.js)

This document outlines the available endpoints for the admin-side system. All endpoints are POST requests.

## Teacher Management

### Add Teacher
- **Endpoint**: `/addteacher`
- **Payload**: 
  ```json
  { 
    "username": "string", 
    "password": "string" 
  }
  ```
- **Response**: 
  - Success: Status 200, `"Ok"`
  - Failure: Status 201, `"Teacher already exists with same username!"`

### Delete Teacher
- **Endpoint**: `/deleteteacher`
- **Payload**: 
  ```json
  { 
    "username": "string" 
  }
  ```
- **Response**: 
  - Success: Status 200, `"OK"`
  - Not Found: Status 201, `"Record not found"`

### Update Teacher
- **Endpoint**: `/updateteacher`
- **Payload**: 
  ```json
  { 
    "username": "string", 
    "subject": "string" 
  }
  ```
- **Response**: 
  - Success: Status 200, `"ok"`
  - Not Found: Status 201, `"Record not found"`

## Subject Management

### Update Subject List
- **Endpoint**: `/update_subject_list`
- **Payload**: 
  ```json
  { 
    "semester": "string", 
    "branch": "string", 
    "subject_ids": ["string"] 
  }
  ```
- **Response**: `"updated"` or error details

### Set Subject List for Students
- **Endpoint**: `/set_subject_list`
- **Payload**: 
  ```json
  { 
    "semester": "string", 
    "branch": "string" 
  }
  ```
- **Response**: `"updated"` or `"failed to find subject list"`

### Add/Update Subject
- **Endpoint**: `/add_subject`
- **Payload**: 
  ```json
  { 
    "subject_id": "string", 
    "subject_name": "string", 
    "branch": "string" 
  }
  ```
- **Response**: `"updated"` or error details

## Student Management

### Get Student Information
- **Endpoint**: `/get_student`
- **Payload**: 
  ```json
  { 
    "pid": "string" 
  }
  ```
- **Response**: JSON object with student and subjects data

### Save Student Report
- **Endpoint**: `/save_report`
- **Payload**: 
  ```json
  { 
    "start": "number", 
    "end": "number", 
    "exceptions": ["number"], 
    "branch": "string", 
    "semester": "string", 
    "clear": "boolean", 
    "updatedSemester": "string" 
  }
  ```
- **Response**: `"updated"` or error message

## Gazette Generation

### Create Gazette
- **Endpoint**: `/create_gazette`
- **Payload**: 
  ```json
  { 
    "semester": "string", 
    "branch": "string" 
  }
  ```
- **Response**: JSON object with generated Excel workbook

## Teacher-Subject Association Management

### Get Unverified Associations
- **Endpoint**: `/get_unverified_teacher_subject`
- **Response**: Array of unverified teacher-subject associations

### Get Accepted Associations
- **Endpoint**: `/get_accepted_teacher_subject`
- **Response**: Array of accepted teacher-subject associations

### Get Rejected Associations
- **Endpoint**: `/get_rejected_teacher_subject`
- **Response**: Array of rejected teacher-subject associations

### Accept Teacher-Subject Association
- **Endpoint**: `/accept_teacher_subject`
- **Payload**: 
  ```json
  { 
    "_id": "string" 
  }
  ```
- **Response**: Updated teacher-subject object

### Deny Teacher-Subject Association
- **Endpoint**: `/deny_teacher_subject`
- **Payload**: 
  ```json
  { 
    "_id": "string" 
  }
  ```
- **Response**: Updated teacher-subject object

## Error Handling

All endpoints return appropriate error responses (usually status 400 or 500) in case of failures. Always handle these cases in your frontend implementation.

## Notes for Frontend Developers

1. All endpoints use POST method.
2. Ensure to set the appropriate headers, including `Content-Type: application/json`.
3. Handle all possible response statuses, including success and error cases.
4. For endpoints that return large datasets (like `/create_gazette`), consider implementing pagination or lazy loading in the frontend.
5. Implement proper error handling and user feedback for failed requests.
