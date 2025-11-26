# SautiChama Backend API Documentation

This document describes all API endpoints that the frontend expects from the backend server.

## Base Configuration

- **Base URL**: `http://localhost:3000/api` (configurable via `.env`)
- **Content-Type**: `application/json`
- **Authentication**: To be implemented (JWT recommended)

---

## 1. Health Check

### GET `/health`

Check if API is running

**Response:**

```json
{
  "status": "ok",
  "message": "API is running",
  "timestamp": "2024-11-26T12:00:00.000Z"
}
```

---

## 2. Chama Registration & Management

### POST `/chamas/register`

Register a new chama (from landing page signup form)

**Request Body:**

```json
{
  "chamaName": "Jamii Welfare Group",
  "contactPerson": "Mary Wanjiku",
  "phone": "+254712345678",
  "email": "mary@example.com",
  "members": "25"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Chama registered successfully",
  "data": {
    "chamaId": "CH001",
    "chamaName": "Jamii Welfare Group",
    "registrationDate": "2024-11-26T12:00:00.000Z"
  }
}
```

### GET `/chamas/:chamaId`

Get chama details

**Response:**

```json
{
  "id": "CH001",
  "chamaName": "Jamii Welfare Group",
  "registrationNumber": "CG-2024-001",
  "location": "Nairobi, Kenya",
  "totalMembers": 25,
  "totalBalance": 65000,
  "createdAt": "2024-11-26T12:00:00.000Z"
}
```

### PUT `/chamas/:chamaId/settings`

Update chama settings

**Request Body:**

```json
{
  "chamaName": "Updated Name",
  "registrationNumber": "CG-2024-001",
  "location": "Nairobi, Kenya",
  "minApprovers": "2",
  "approvalTimeout": 24,
  "voiceEnabled": true,
  "notifyAllMembers": true,
  "defaultLanguage": "Swahili",
  "ussdCode": "*384*123#"
}
```

### GET `/chamas/:chamaId/stats`

Get chama statistics for dashboard

**Response:**

```json
{
  "totalBalance": 65000,
  "activeMembers": 25,
  "pendingApprovals": 3,
  "monthlyTransactions": 47,
  "transactionTrends": [
    { "month": "Jan", "amount": 45000 },
    { "month": "Feb", "amount": 52000 }
  ],
  "transactionTypes": [
    { "name": "Loans", "value": 45 },
    { "name": "Savings", "value": 30 }
  ]
}
```

---

## 3. Members Management

### GET `/members`

Get all members

**Query Parameters:**

- `chamaId` (required): Chama identifier
- `status`: Filter by status (Active/Inactive)
- `role`: Filter by role

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Mary Wanjiku",
      "role": "Chairperson",
      "phone": "+254712345678",
      "balance": 15000,
      "status": "Active",
      "joinedDate": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

### GET `/members/:memberId`

Get single member details

**Response:**

```json
{
  "id": 1,
  "name": "Mary Wanjiku",
  "role": "Chairperson",
  "phone": "+254712345678",
  "email": "mary@example.com",
  "balance": 15000,
  "status": "Active",
  "joinedDate": "2024-01-15T12:00:00.000Z",
  "totalContributions": 50000,
  "totalLoans": 35000
}
```

### POST `/members`

Create new member

**Request Body:**

```json
{
  "chamaId": "CH001",
  "name": "John Doe",
  "role": "Member",
  "phone": "+254723456789",
  "email": "john@example.com",
  "initialBalance": 5000
}
```

**Response:**

```json
{
  "success": true,
  "message": "Member added successfully",
  "data": {
    "id": 6,
    "name": "John Doe",
    "role": "Member",
    "phone": "+254723456789",
    "balance": 5000,
    "status": "Active"
  }
}
```

### PUT `/members/:memberId`

Update member details

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "role": "Treasurer",
  "phone": "+254723456789",
  "email": "newemail@example.com"
}
```

### DELETE `/members/:memberId`

Remove member from chama

**Response:**

```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

### PATCH `/members/:memberId/balance`

Update member balance

**Request Body:**

```json
{
  "amount": 5000,
  "type": "credit" // or "debit"
}
```

### GET `/members/:memberId/transactions`

Get member's transaction history

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "TX001",
      "type": "Loan",
      "amount": 5000,
      "status": "Approved",
      "date": "2024-11-26T12:00:00.000Z"
    }
  ]
}
```

---

## 4. Transactions Management

### GET `/transactions`

Get all transactions

**Query Parameters:**

- `chamaId` (required): Chama identifier
- `status`: Filter by status (Pending/Approved/Completed/Rejected)
- `type`: Filter by type (Loan/Withdrawal/Contribution)
- `startDate`: Start date filter
- `endDate`: End date filter
- `search`: Search by recipient name or transaction ID

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "TX001",
      "type": "Loan",
      "recipient": "Mary Wanjiku",
      "recipientId": 1,
      "amount": 5000,
      "status": "Approved",
      "date": "2024-11-26",
      "approvers": ["Chair", "Treasurer"],
      "description": "School fees loan",
      "createdAt": "2024-11-26T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 47
  }
}
```

### GET `/transactions/:transactionId`

Get single transaction details

**Response:**

```json
{
  "id": "TX001",
  "type": "Loan",
  "recipient": "Mary Wanjiku",
  "recipientId": 1,
  "amount": 5000,
  "status": "Approved",
  "date": "2024-11-26",
  "description": "School fees loan",
  "approvers": [
    {
      "name": "Chair",
      "approvedAt": "2024-11-26T12:00:00.000Z"
    },
    {
      "name": "Treasurer",
      "approvedAt": "2024-11-26T12:05:00.000Z"
    }
  ],
  "voiceNotificationSent": true,
  "createdAt": "2024-11-26T12:00:00.000Z"
}
```

### POST `/transactions`

Create new transaction request

**Request Body:**

```json
{
  "chamaId": "CH001",
  "type": "Loan",
  "recipient": "Mary Wanjiku",
  "recipientId": 1,
  "amount": 5000,
  "description": "School fees loan",
  "requestedBy": "Chair",
  "requesterId": 1
}
```

**Response:**

```json
{
  "success": true,
  "message": "Transaction request created successfully",
  "data": {
    "id": "TX006",
    "type": "Loan",
    "recipient": "Mary Wanjiku",
    "amount": 5000,
    "status": "Pending",
    "date": "2024-11-26",
    "approvers": ["Chair"]
  }
}
```

### POST `/transactions/:transactionId/approve`

Approve a pending transaction

**Request Body:**

```json
{
  "approverId": 2,
  "approverName": "Treasurer"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Transaction approved successfully",
  "data": {
    "id": "TX001",
    "status": "Approved", // or still "Pending" if more approvals needed
    "approvers": ["Chair", "Treasurer"],
    "requiresMoreApprovals": false,
    "voiceNotificationTriggered": true
  }
}
```

### POST `/transactions/:transactionId/reject`

Reject a pending transaction

**Request Body:**

```json
{
  "approverId": 2,
  "approverName": "Treasurer",
  "reason": "Insufficient funds"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Transaction rejected",
  "data": {
    "id": "TX001",
    "status": "Rejected"
  }
}
```

### PATCH `/transactions/:transactionId/status`

Update transaction status

**Request Body:**

```json
{
  "status": "Completed",
  "approverId": 1
}
```

### GET `/transactions/stats`

Get transaction statistics

**Query Parameters:**

- `chamaId` (required)
- `startDate`
- `endDate`

**Response:**

```json
{
  "totalTransactions": 47,
  "totalAmount": 328000,
  "byType": {
    "Loans": { "count": 25, "amount": 150000 },
    "Withdrawals": { "count": 10, "amount": 78000 },
    "Contributions": { "count": 12, "amount": 100000 }
  },
  "byStatus": {
    "Pending": 3,
    "Approved": 15,
    "Completed": 29
  }
}
```

---

## 5. Contact & Communication

### POST `/contact`

Submit contact form (from landing page)

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254712345678",
  "message": "I'm interested in SautiChama for my group"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message sent successfully. We'll contact you within 24 hours."
}
```

---

## 6. Voice & SMS Integration (Africa's Talking)

### POST `/notifications/voice`

Trigger voice notification (called after transaction approval)

**Request Body:**

```json
{
  "transactionId": "TX001",
  "recipients": ["+254712345678", "+254723456789"],
  "message": "Sauti-Chama Alert: 5000 Shillings has been approved for Mary. Group balance is now 20,000 Shillings.",
  "language": "Swahili"
}
```

### POST `/notifications/sms`

Send SMS notification

**Request Body:**

```json
{
  "recipients": ["+254712345678"],
  "message": "Transaction TX001 requires your approval. Reply 1 to approve."
}
```

---

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Database Schema Recommendations

### Members Table

```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chama_id TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  balance DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Active',
  joined_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table

```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  chama_id TEXT NOT NULL,
  type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  recipient_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'Pending',
  description TEXT,
  requested_by TEXT,
  requester_id INTEGER,
  date DATE NOT NULL,
  voice_notification_sent BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipient_id) REFERENCES members(id)
);
```

### Transaction Approvals Table

```sql
CREATE TABLE transaction_approvals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id TEXT NOT NULL,
  approver_id INTEGER NOT NULL,
  approver_name TEXT NOT NULL,
  approved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id),
  FOREIGN KEY (approver_id) REFERENCES members(id)
);
```

### Chamas Table

```sql
CREATE TABLE chamas (
  id TEXT PRIMARY KEY,
  chama_name TEXT NOT NULL,
  registration_number TEXT,
  location TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  min_approvers INTEGER DEFAULT 2,
  approval_timeout INTEGER DEFAULT 24,
  voice_enabled BOOLEAN DEFAULT TRUE,
  notify_all_members BOOLEAN DEFAULT TRUE,
  default_language TEXT DEFAULT 'Swahili',
  ussd_code TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Submissions Table

```sql
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables (Backend)

Your backend should use these environment variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=./database.sqlite

# Africa's Talking API
AT_API_KEY=your_api_key
AT_USERNAME=your_username
AT_SENDER_ID=SAUTICHAMA

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT Secret (if using authentication)
JWT_SECRET=your_secret_key
```

---

## Testing

You can test the frontend's API integration by:

1. **Using Mock API**: Tools like `json-server` or `MSW (Mock Service Worker)`
2. **Backend Development**: Build the backend following this specification
3. **Update `.env`**: Point `VITE_API_BASE_URL`

---
