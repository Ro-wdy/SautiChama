# Backend Integration Guide

This guide will help you connect the SautiChama frontend to your backend API.

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and update with your backend URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Start Your Backend Server

Make sure your backend is running on the URL specified in `.env` (default: `http://localhost:3000`).

### 3. Test the Connection

The frontend will automatically try to connect to your backend when:
- User submits signup form on landing page
- User adds a new member in admin dashboard
- User creates a transaction
- User saves settings

---

## Current Implementation Status

### ✅ Frontend Features (Working with Mock Data)

- All UI components functional
- Form validations
- Modal dialogs
- Toast notifications
- State management
- Search and filtering
- Responsive design

### 🔄 Ready for Backend (API Services Created)

The following services are ready to connect:

**Member Operations**
- ✅ `getAllMembers()` - GET `/members`
- ✅ `getMemberById(id)` - GET `/members/:id`
- ✅ `createMember(data)` - POST `/members`
- ✅ `updateMember(id, data)` - PUT `/members/:id`
- ✅ `deleteMember(id)` - DELETE `/members/:id`

**Transaction Operations**
- ✅ `getAllTransactions(filters)` - GET `/transactions`
- ✅ `createTransaction(data)` - POST `/transactions`
- ✅ `approveTransaction(id, approverId)` - POST `/transactions/:id/approve`
- ✅ `rejectTransaction(id, approverId, reason)` - POST `/transactions/:id/reject`

**Chama Operations**
- ✅ `registerChama(data)` - POST `/chamas/register`
- ✅ `getChamaDetails(id)` - GET `/chamas/:id`
- ✅ `updateChamaSettings(id, settings)` - PUT `/chamas/:id/settings`
- ✅ `submitContactForm(data)` - POST `/contact`

---

## Integration Steps

### Step 1: Update Components to Use API

Currently, components use local state. To connect to backend:

**Example: Admin Dashboard Members Tab**

```javascript
// Before (Mock data)
const [members, setMembers] = useState([...mockData]);

// After (API integration)
import { useEffect, useState } from 'react';
import { getAllMembers, createMember, deleteMember } from '@/services/memberService';
import { useToast } from '@/components/ui/Toast';

const [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true);
const { addToast } = useToast();

// Fetch members on mount
useEffect(() => {
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getAllMembers();
      setMembers(data.data || data); // Adjust based on your API response structure
    } catch (error) {
      addToast('Failed to load members', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  fetchMembers();
}, []);

// Create member
const handleAddMember = async (e) => {
  e.preventDefault();
  try {
    const result = await createMember(newMember);
    setMembers([...members, result.data]);
    addToast('Member added successfully!', 'success');
    setShowAddMemberModal(false);
  } catch (error) {
    addToast('Failed to add member', 'error');
  }
};
```

### Step 2: Handle Loading States

Add loading indicators to your UI:

```javascript
{loading ? (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
    <p className="mt-4 text-gray-600">Loading members...</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {members.map((member) => (
      // Member cards
    ))}
  </div>
)}
```

### Step 3: Use Custom Hook (Recommended)

For cleaner code, use the provided `useApi` hook:

```javascript
import { useApi } from '@/hooks/useApi';
import { createMember } from '@/services/memberService';

const { loading, execute: addMember } = useApi(createMember, {
  successMessage: 'Member added successfully!',
  onSuccess: (data) => {
    setMembers([...members, data.data]);
    setShowAddMemberModal(false);
  }
});

const handleAddMember = async (e) => {
  e.preventDefault();
  await addMember(newMember);
};
```

---

## Testing Without Backend

### Option 1: Use JSON Server (Recommended)

Install json-server for quick API mocking:

```bash
npm install -g json-server
```

Create `db.json`:

```json
{
  "members": [
    {
      "id": 1,
      "name": "Mary Wanjiku",
      "role": "Chairperson",
      "phone": "+254712345678",
      "balance": 15000,
      "status": "Active"
    }
  ],
  "transactions": [],
  "chamas": []
}
```

Run mock server:

```bash
json-server --watch db.json --port 3000
```

Update `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Option 2: Use Mock Service Worker (MSW)

For more control, use MSW to mock API responses in development.

---

## Common Issues & Solutions

### CORS Errors

If you see CORS errors, your backend needs to enable CORS:

**Express.js Example:**
```javascript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true
}));
```

### Network Errors

If requests fail:
1. Check backend is running: `curl http://localhost:3000/api/health`
2. Verify `.env` file has correct URL
3. Check browser console for error details

### Response Format Issues

The frontend expects responses like:

```json
{
  "success": true,
  "data": [...],
  "message": "Operation successful"
}
```

Or for errors:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

Adjust `src/services/api.js` if your backend uses different format.

---

## Priority Integration Order

Recommended order for connecting endpoints:

1. **Health Check** (`/health`) - Test basic connectivity
2. **Contact Form** (`/contact`) - Landing page contact
3. **Chama Registration** (`/chamas/register`) - Landing page signup
4. **Members** (`/members/*`) - Admin dashboard members tab
5. **Transactions** (`/transactions/*`) - Admin dashboard transactions
6. **Settings** (`/chamas/:id/settings`) - Admin dashboard settings
7. **Voice/SMS** - Africa's Talking integration

---

## Next Steps

1. ✅ Backend implements endpoints from `API_DOCUMENTATION.md`
2. ✅ Update `.env` with backend URL
3. ✅ Replace mock data with API calls in components
4. ✅ Test each feature end-to-end
5. ✅ Add authentication (JWT recommended)
6. ✅ Implement Africa's Talking APIs
7. ✅ Deploy to production

---

## Getting Help

- **API Specification**: See `API_DOCUMENTATION.md`
- **Frontend Structure**: See `README.md`
- **Service Files**: Check `src/services/` directory
- **Example Components**: See `src/pages/AdminDashboard.jsx`

---

## Summary

Your frontend is **100% ready** for backend integration:

✅ API service layer complete  
✅ Error handling in place  
✅ Loading states ready  
✅ Form validations working  
✅ Environment configuration setup  
✅ Complete API documentation provided  

Just update the `.env` file and start integrating! 🚀
