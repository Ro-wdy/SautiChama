import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Home, Users, CreditCard, Settings, LogOut, Menu, X, 
  TrendingUp, DollarSign, CheckCircle, Clock, Phone, Volume2,
  ArrowUpRight, ArrowDownRight, Search, Filter, Bell, Edit, Trash2,
  UserPlus, PhoneCall, Eye, Building2, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from '@/components/ui/Modal'
import { Toggle } from '@/components/ui/Toggle'
import { useToast } from '@/components/ui/Toast'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const { addToast } = useToast()

  // Chamas state
  const [chamas, setChamas] = useState([])
  const [chamasLoading, setChamasLoading] = useState(false)
  const [selectedChamaForView, setSelectedChamaForView] = useState(null)
  const [showChamaDetailModal, setShowChamaDetailModal] = useState(false)
  const [showAddChamaModal, setShowAddChamaModal] = useState(false)
  const [newChamaForm, setNewChamaForm] = useState({
    chamaName: '',
    contactPerson: '',
    phone: '',
    email: '',
    location: '',
    registrationNumber: '',
    members: ''
  })

  // Modal states
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)

  // Settings states
  const [settings, setSettings] = useState({
    minApprovers: '2',
    approvalTimeout: 24,
    voiceEnabled: true,
    notifyAllMembers: true,
    defaultLanguage: 'Swahili',
    chamaName: 'Jamii Welfare Group',
    registrationNumber: 'CG-2024-001',
    location: 'Nairobi, Kenya',
    apiKey: '',
    ussdCode: '*384*123#'
  })

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample data
  const [transactionData] = useState([
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 67000 },
  ])

  const transactionTypeData = [
    { name: 'Loans', value: 45 },
    { name: 'Savings', value: 30 },
    { name: 'Withdrawals', value: 15 },
    { name: 'Contributions', value: 10 },
  ]

  const [transactions, setTransactions] = useState([
    { id: 'TX001', type: 'Loan', recipient: 'Mary Wanjiku', amount: 5000, status: 'Approved', date: '2024-11-26', approvers: ['Chair', 'Treasurer'] },
    { id: 'TX002', type: 'Withdrawal', recipient: 'John Kamau', amount: 3000, status: 'Pending', date: '2024-11-26', approvers: ['Chair'] },
    { id: 'TX003', type: 'Contribution', recipient: 'Group Fund', amount: 2000, status: 'Completed', date: '2024-11-25', approvers: ['Auto'] },
    { id: 'TX004', type: 'Loan', recipient: 'Grace Achieng', amount: 7500, status: 'Approved', date: '2024-11-25', approvers: ['Chair', 'Treasurer', 'Secretary'] },
    { id: 'TX005', type: 'Withdrawal', recipient: 'Peter Omondi', amount: 4000, status: 'Completed', date: '2024-11-24', approvers: ['Chair', 'Treasurer'] },
  ])

  const [members, setMembers] = useState([
    { id: 1, name: 'Mary Wanjiku', role: 'Chairperson', phone: '+254 712 345 678', balance: 15000, status: 'Active' },
    { id: 2, name: 'John Kamau', role: 'Treasurer', phone: '+254 723 456 789', balance: 12000, status: 'Active' },
    { id: 3, name: 'Grace Achieng', role: 'Secretary', phone: '+254 734 567 890', balance: 18000, status: 'Active' },
    { id: 4, name: 'Peter Omondi', role: 'Member', phone: '+254 745 678 901', balance: 9000, status: 'Active' },
    { id: 5, name: 'Sarah Muthoni', role: 'Member', phone: '+254 756 789 012', balance: 11000, status: 'Active' },
  ])

  const [newTransaction, setNewTransaction] = useState({
    type: 'Loan',
    recipient: '',
    amount: '',
    description: ''
  })

  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Member',
    phone: '',
    initialBalance: ''
  })

  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac']

  // Fetch chamas from backend
  useEffect(() => {
    if (activeTab === 'chamas') {
      fetchChamas();
    }
  }, [activeTab]);

  const fetchChamas = async () => {
    setChamasLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chamas`);
      const data = await response.json();
      setChamas(data.data || data || []);
      addToast('Chamas loaded successfully', 'success');
    } catch (error) {
      console.error('Error fetching chamas:', error);
      addToast('Failed to load chamas. Using demo data.', 'error');
      // Fallback demo data
      setChamas([
        { id: 1, chamaName: 'Jamii Welfare Group', registrationNumber: 'CG-2024-001', location: 'Nairobi', memberCount: 25, totalBalance: 65000, status: 'Active' },
        { id: 2, chamaName: 'Unity Savings Group', registrationNumber: 'CG-2024-002', location: 'Mombasa', memberCount: 18, totalBalance: 42000, status: 'Active' },
        { id: 3, chamaName: 'Tumaini Chama', registrationNumber: 'CG-2024-003', location: 'Kisumu', memberCount: 32, totalBalance: 89000, status: 'Active' },
      ]);
    } finally {
      setChamasLoading(false);
    }
  };

  const stats = [
    { label: 'Total Balance', value: 'KES 65,000', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Members', value: members.length.toString(), change: `+${members.length - 22}`, icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Approvals', value: transactions.filter(t => t.status === 'Pending').length.toString(), change: '-2', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Monthly Transactions', value: transactions.length.toString(), change: '+8.2%', icon: TrendingUp, color: 'bg-purple-500' },
  ]

  // Handlers
  const handleCreateTransaction = (e) => {
    e.preventDefault()
    const transaction = {
      id: `TX${String(transactions.length + 1).padStart(3, '0')}`,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      approvers: ['Chair']
    }
    setTransactions([transaction, ...transactions])
    addToast('Transaction request created successfully!', 'success')
    setShowNewTransactionModal(false)
    setNewTransaction({ type: 'Loan', recipient: '', amount: '', description: '' })
  }

  const handleApproveTransaction = (txId) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId ? { ...tx, status: 'Approved', approvers: [...tx.approvers, 'Treasurer'] } : tx
    ))
    addToast('Transaction approved successfully!', 'success')
    setShowTransactionDetailModal(false)
  }

  const handleRejectTransaction = (txId) => {
    setTransactions(transactions.filter(tx => tx.id !== txId))
    addToast('Transaction rejected and removed.', 'info')
    setShowTransactionDetailModal(false)
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    const member = {
      id: members.length + 1,
      ...newMember,
      balance: parseFloat(newMember.initialBalance) || 0,
      status: 'Active'
    }
    setMembers([...members, member])
    addToast(`${member.name} added successfully!`, 'success')
    setShowAddMemberModal(false)
    setNewMember({ name: '', role: 'Member', phone: '', initialBalance: '' })
  }

  const handleCallMember = (member) => {
    addToast(`Initiating call to ${member.name} at ${member.phone}...`, 'info')
  }

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(m => m.id !== memberId))
    addToast('Member removed from group.', 'info')
    setShowMemberDetailModal(false)
  }

  const handleSaveSettings = (section) => {
    addToast(`${section} settings saved successfully!`, 'success')
  }

  const handleTestApiConnection = () => {
    addToast('Testing API connection...', 'info')
    setTimeout(() => {
      addToast('API connection successful!', 'success')
    }, 1500)
  }

  const handleAddChama = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chamas/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChamaForm),
      });
      
      if (response.ok) {
        const data = await response.json();
        addToast('Chama registered successfully!', 'success');
        setShowAddChamaModal(false);
        setNewChamaForm({
          chamaName: '',
          contactPerson: '',
          phone: '',
          email: '',
          location: '',
          registrationNumber: '',
          members: ''
        });
        // Refresh chamas list
        fetchChamas();
      } else {
        const error = await response.json();
        addToast(error.message || 'Failed to register chama', 'error');
      }
    } catch (error) {
      console.error('Add chama error:', error);
      addToast('Chama registered! (Simulated)', 'success');
      // Add to local state as fallback
      const newChama = {
        id: chamas.length + 1,
        ...newChamaForm,
        memberCount: parseInt(newChamaForm.members) || 0,
        totalBalance: 0,
        status: 'Active',
        createdAt: new Date().toISOString()
      };
      setChamas([newChama, ...chamas]);
      setShowAddChamaModal(false);
      setNewChamaForm({
        chamaName: '',
        contactPerson: '',
        phone: '',
        email: '',
        location: '',
        registrationNumber: '',
        members: ''
      });
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || tx.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Volume2 className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-700">SautiChama</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'overview' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'transactions' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'members' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="h-5 w-5 mr-3" />
            Members
          </button>
          <button
            onClick={() => setActiveTab('chamas')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'chamas' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Building2 className="h-5 w-5 mr-3" />
            All Chamas
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'settings' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="h-5 w-5 mr-3" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 ml-4 lg:ml-0">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => addToast('You have 3 pending approvals', 'info')}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    MR
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">Mary Wanjiku</p>
                    <p className="text-xs text-gray-500">Chairperson</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                          <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change.startsWith('+') ? <ArrowUpRight className="inline h-4 w-4" /> : <ArrowDownRight className="inline h-4 w-4" />}
                            {stat.change}
                          </p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Trends</CardTitle>
                    <CardDescription>Monthly transaction volume (KES)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={transactionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Types</CardTitle>
                    <CardDescription>Distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={transactionTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {transactionTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest activities requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => { setSelectedTransaction(transaction); setShowTransactionDetailModal(true); }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.status === 'Approved' ? 'bg-green-100' :
                            transaction.status === 'Pending' ? 'bg-yellow-100' :
                            'bg-blue-100'
                          }`}>
                            <CreditCard className={`h-5 w-5 ${
                              transaction.status === 'Approved' ? 'text-green-600' :
                              transaction.status === 'Pending' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.recipient}</p>
                            <p className="text-sm text-gray-500">{transaction.type} • {transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">KES {transaction.amount.toLocaleString()}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Transactions</h2>
                  <p className="text-gray-600">Manage and monitor all chama transactions</p>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700" onClick={() => setShowNewTransactionModal(true)}>
                  <Phone className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.recipient}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KES {transaction.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => { setSelectedTransaction(transaction); setShowTransactionDetailModal(true); }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Members</h2>
                  <p className="text-gray-600">Manage chama members and roles</p>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700" onClick={() => setShowAddMemberModal(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          member.role === 'Chairperson' ? 'bg-purple-100 text-purple-800' :
                          member.role === 'Treasurer' ? 'bg-blue-100 text-blue-800' :
                          member.role === 'Secretary' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.role}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {member.phone}
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Balance:</span>
                          <span className="font-semibold text-primary-700">KES {member.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Status:</span>
                          <span className="text-green-600 font-medium">{member.status}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleCallMember(member)}
                        >
                          <PhoneCall className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => { setSelectedMember(member); setShowMemberDetailModal(true); }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chamas' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Chamas</h2>
                  <p className="text-gray-600">Overview of all registered chamas and their members</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={fetchChamas}
                    disabled={chamasLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${chamasLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button 
                    className="bg-primary-600 hover:bg-primary-700" 
                    onClick={() => setShowAddChamaModal(true)}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Add Chama
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Chamas</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{chamas.length}</p>
                      </div>
                      <div className="bg-green-500 p-3 rounded-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Members</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {chamas.reduce((sum, chama) => sum + (chama.memberCount || 0), 0)}
                        </p>
                      </div>
                      <div className="bg-blue-500 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Combined Balance</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          KES {chamas.reduce((sum, chama) => sum + (chama.totalBalance || 0), 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-500 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chamas List */}
              <Card>
                <CardHeader>
                  <CardTitle>Registered Chamas</CardTitle>
                  <CardDescription>View all chamas and their member details</CardDescription>
                </CardHeader>
                <CardContent>
                  {chamasLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading chamas...</p>
                    </div>
                  ) : chamas.length === 0 ? (
                    <div className="text-center py-12">
                      <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No chamas registered yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chama Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {chamas.map((chama) => (
                            <tr key={chama.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {chama.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                    <Building2 className="h-5 w-5 text-primary-600" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{chama.chamaName}</div>
                                    <div className="text-sm text-gray-500">{chama.contactPerson || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {chama.registrationNumber || 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {chama.location || 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm font-medium text-gray-900">{chama.memberCount || 0}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                KES {(chama.totalBalance || 0).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  chama.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {chama.status || 'Active'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedChamaForView(chama);
                                    setShowChamaDetailModal(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-600">Manage your chama configuration</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Approval Settings</CardTitle>
                    <CardDescription>Configure multi-signature requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Approvers Required
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={settings.minApprovers}
                        onChange={(e) => setSettings({ ...settings, minApprovers: e.target.value })}
                      >
                        <option value="2">2 Approvers</option>
                        <option value="3">3 Approvers</option>
                        <option value="all">All Officials</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approval Timeout (hours)
                      </label>
                      <input
                        type="number"
                        value={settings.approvalTimeout}
                        onChange={(e) => setSettings({ ...settings, approvalTimeout: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <Button className="w-full" onClick={() => handleSaveSettings('Approval')}>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Voice Notification Settings</CardTitle>
                    <CardDescription>Configure voice call preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Language
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={settings.defaultLanguage}
                        onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                      >
                        <option>Swahili</option>
                        <option>English</option>
                        <option>Kikuyu</option>
                        <option>Luo</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Enable Voice Notifications</span>
                      <Toggle 
                        enabled={settings.voiceEnabled}
                        onChange={(value) => setSettings({ ...settings, voiceEnabled: value })}
                        label="Voice notifications"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Notify All Members</span>
                      <Toggle 
                        enabled={settings.notifyAllMembers}
                        onChange={(value) => setSettings({ ...settings, notifyAllMembers: value })}
                        label="Notify all members"
                      />
                    </div>
                    <Button className="w-full" onClick={() => handleSaveSettings('Voice Notification')}>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Group Information</CardTitle>
                    <CardDescription>Update chama details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chama Name
                      </label>
                      <input
                        type="text"
                        value={settings.chamaName}
                        onChange={(e) => setSettings({ ...settings, chamaName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        value={settings.registrationNumber}
                        onChange={(e) => setSettings({ ...settings, registrationNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={settings.location}
                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <Button className="w-full" onClick={() => handleSaveSettings('Group Information')}>Update Information</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                    <CardDescription>API configurations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Africa's Talking API Key
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••••••"
                        value={settings.apiKey}
                        onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        USSD Short Code
                      </label>
                      <input
                        type="text"
                        value={settings.ussdCode}
                        onChange={(e) => setSettings({ ...settings, ussdCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">API Connected</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleTestApiConnection}>Test Connection</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {/* New Transaction Modal */}
      <Modal isOpen={showNewTransactionModal} onClose={() => setShowNewTransactionModal(false)}>
        <ModalHeader>
          <ModalTitle>Create New Transaction Request</ModalTitle>
          <ModalDescription>Request a new transaction that requires multi-signature approval</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleCreateTransaction}>
          <ModalContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type *</label>
              <select
                required
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Loan</option>
                <option>Withdrawal</option>
                <option>Contribution</option>
                <option>Emergency Fund</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient *</label>
              <input
                type="text"
                required
                value={newTransaction.recipient}
                onChange={(e) => setNewTransaction({ ...newTransaction, recipient: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Member name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (KES) *</label>
              <input
                type="number"
                required
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Purpose of transaction..."
              />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowNewTransactionModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Request</Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <Modal isOpen={showTransactionDetailModal} onClose={() => setShowTransactionDetailModal(false)}>
          <ModalHeader>
            <ModalTitle>Transaction Details</ModalTitle>
            <ModalDescription>ID: {selectedTransaction.id}</ModalDescription>
          </ModalHeader>
          <ModalContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedTransaction.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">KES {selectedTransaction.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Recipient</p>
                <p className="font-medium">{selectedTransaction.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedTransaction.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedTransaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedTransaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedTransaction.status}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Approvers</p>
                <p className="font-medium">{selectedTransaction.approvers.join(', ')}</p>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            {selectedTransaction.status === 'Pending' && (
              <>
                <Button variant="outline" onClick={() => handleRejectTransaction(selectedTransaction.id)}>
                  Reject
                </Button>
                <Button onClick={() => handleApproveTransaction(selectedTransaction.id)}>
                  Approve
                </Button>
              </>
            )}
            {selectedTransaction.status !== 'Pending' && (
              <Button onClick={() => setShowTransactionDetailModal(false)}>Close</Button>
            )}
          </ModalFooter>
        </Modal>
      )}

      {/* Add Member Modal */}
      <Modal isOpen={showAddMemberModal} onClose={() => setShowAddMemberModal(false)}>
        <ModalHeader>
          <ModalTitle>Add New Member</ModalTitle>
          <ModalDescription>Add a new member to your chama</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleAddMember}>
          <ModalContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                required
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Member</option>
                <option>Chairperson</option>
                <option>Treasurer</option>
                <option>Secretary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+254 712 345 678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Balance (KES)</label>
              <input
                type="number"
                value={newMember.initialBalance}
                onChange={(e) => setNewMember({ ...newMember, initialBalance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0"
              />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddMemberModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Member Detail Modal */}
      {selectedMember && (
        <Modal isOpen={showMemberDetailModal} onClose={() => setShowMemberDetailModal(false)}>
          <ModalHeader>
            <ModalTitle>Member Details</ModalTitle>
            <ModalDescription>{selectedMember.name}</ModalDescription>
          </ModalHeader>
          <ModalContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedMember.role === 'Chairperson' ? 'bg-purple-100 text-purple-800' :
                  selectedMember.role === 'Treasurer' ? 'bg-blue-100 text-blue-800' :
                  selectedMember.role === 'Secretary' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedMember.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedMember.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-medium text-primary-700">KES {selectedMember.balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">{selectedMember.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member ID</p>
                <p className="font-medium">M{String(selectedMember.id).padStart(3, '0')}</p>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => handleDeleteMember(selectedMember.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
            <Button onClick={() => handleCallMember(selectedMember)}>
              <PhoneCall className="h-4 w-4 mr-2" />
              Call Member
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Add Chama Modal */}
      <Modal isOpen={showAddChamaModal} onClose={() => setShowAddChamaModal(false)}>
        <ModalHeader>
          <ModalTitle>Add New Chama</ModalTitle>
          <ModalDescription>Register a new chama to the system</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleAddChama}>
          <ModalContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chama Name *</label>
              <input
                type="text"
                required
                value={newChamaForm.chamaName}
                onChange={(e) => setNewChamaForm({ ...newChamaForm, chamaName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Jamii Welfare Group"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input
                type="text"
                required
                value={newChamaForm.contactPerson}
                onChange={(e) => setNewChamaForm({ ...newChamaForm, contactPerson: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newChamaForm.phone}
                  onChange={(e) => setNewChamaForm({ ...newChamaForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+254712345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newChamaForm.email}
                  onChange={(e) => setNewChamaForm({ ...newChamaForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={newChamaForm.location}
                  onChange={(e) => setNewChamaForm({ ...newChamaForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Nairobi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Members *</label>
                <input
                  type="number"
                  required
                  value={newChamaForm.members}
                  onChange={(e) => setNewChamaForm({ ...newChamaForm, members: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 25"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <input
                type="text"
                value={newChamaForm.registrationNumber}
                onChange={(e) => setNewChamaForm({ ...newChamaForm, registrationNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., CG-2024-001"
              />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddChamaModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Building2 className="h-4 w-4 mr-2" />
              Add Chama
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Chama Detail Modal */}
      {selectedChamaForView && (
        <Modal isOpen={showChamaDetailModal} onClose={() => setShowChamaDetailModal(false)} className="max-w-2xl">
          <ModalHeader>
            <ModalTitle>Chama Details</ModalTitle>
            <ModalDescription>{selectedChamaForView.chamaName}</ModalDescription>
          </ModalHeader>
          <ModalContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedChamaForView.chamaName}</h3>
                <p className="text-sm text-gray-500">{selectedChamaForView.registrationNumber || 'No Registration Number'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-medium">{selectedChamaForView.contactPerson || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedChamaForView.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedChamaForView.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedChamaForView.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="font-medium text-primary-700">{selectedChamaForView.memberCount || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="font-medium text-green-600">KES {(selectedChamaForView.totalBalance || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedChamaForView.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedChamaForView.status || 'Active'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registered Date</p>
                <p className="font-medium">{selectedChamaForView.createdAt ? new Date(selectedChamaForView.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Member List Section */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Members Overview</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">Total Members:</span>
                  </div>
                  <span className="font-semibold text-gray-900">{selectedChamaForView.memberCount || 0}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={async () => {
                    try {
                      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chamas/${selectedChamaForView.id}/members`);
                      const data = await response.json();
                      addToast(`${selectedChamaForView.chamaName} has ${data.data?.length || data.length || 0} members`, 'info');
                    } catch (error) {
                      addToast('Failed to fetch member details', 'error');
                    }
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All Members
                </Button>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => setShowChamaDetailModal(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}
