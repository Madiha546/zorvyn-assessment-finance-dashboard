export const mockTransactions = [
  { id: 't1', date: '2026-04-05', description: 'Spotify', amount: -10.99, category: 'Subscriptions' },
  { id: 't2', date: '2026-04-05', description: 'Gym Membership', amount: -50.00, category: 'Subscriptions' },
  { id: 't3', date: '2026-04-04', description: 'Coffee Shop', amount: -4.50, category: 'Dining' },
  { id: 't4', date: '2026-04-03', description: 'Freelance Payout', amount: 850.00, category: 'Income' },
  { id: 't5', date: '2026-04-03', description: 'Electric Bill', amount: -85.00, category: 'Utilities' },
  { id: 't6', date: '2026-04-02', description: 'Salary', amount: 5000.00, category: 'Income' },
  { id: 't7', date: '2026-04-01', description: 'Grocery Store', amount: -120.50, category: 'Groceries' },
];

export const summaryData = {
  totalBalance: 12450.75,
  monthlyIncome: 5850.00,
  monthlyExpenses: 845.25,
};

export const chartData = [
  { name: 'Nov', balance: 9500 },
  { name: 'Dec', balance: 10200 },
  { name: 'Jan', balance: 9800 },
  { name: 'Feb', balance: 11500 },
  { name: 'Mar', balance: 12000 },
  { name: 'Apr', balance: 12450 },
];

export const categoryData = [
  { name: 'Groceries', value: 400, color: '#22c55e' }, // Lime Green
  { name: 'Dining', value: 200, color: '#ec4899' }, // Pink
  { name: 'Utilities', value: 150, color: '#f59e0b' }, // Amber
  { name: 'Subscriptions', value: 95, color: '#a855f7' }, // Purple
];

export const mockSavingsData = [
  { month: 'Nov', target: 2000, actual: 2100 },
  { month: 'Dec', target: 2000, actual: 1800 },
  { month: 'Jan', target: 2500, actual: 2550 },
  { month: 'Feb', target: 2500, actual: 2800 },
  { month: 'Mar', target: 3000, actual: 3200 },
  { month: 'Apr', target: 3000, actual: 3450 },
];

export const mockSpendingVelocity = [
  { date: 'W1', Groceries: 120, Dining: 40, Utilities: 0, Subscriptions: 15 },
  { date: 'W2', Groceries: 140, Dining: 85, Utilities: 75, Subscriptions: 10 },
  { date: 'W3', Groceries: 95, Dining: 35, Utilities: 0, Subscriptions: 50 },
  { date: 'W4', Groceries: 180, Dining: 120, Utilities: 80, Subscriptions: 20 },
];

export const mockUpcomingBills = [
  { id: 1, name: 'Netflix Premium', amount: 22.99, date: '2026-04-10', type: 'Entertainment', urgent: false },
  { id: 2, name: 'Electric Utility', amount: 84.50, date: '2026-04-12', type: 'Utility', urgent: true },
  { id: 3, name: 'Internet Provider', amount: 65.00, date: '2026-04-15', type: 'Utility', urgent: false },
  { id: 4, name: 'Gym Membership', amount: 49.99, date: '2026-04-18', type: 'Health', urgent: false },
];

export const mockYearlyAnalytics = [
  { month: 'May', spending: 2100, income: 4500 },
  { month: 'Jun', spending: 2400, income: 4500 },
  { month: 'Jul', spending: 3100, income: 5200 },
  { month: 'Aug', spending: 1800, income: 4500 },
  { month: 'Sep', spending: 2200, income: 4500 },
  { month: 'Oct', spending: 2600, income: 4800 },
  { month: 'Nov', spending: 2900, income: 5100 },
  { month: 'Dec', spending: 4200, income: 6000 },
  { month: 'Jan', spending: 1900, income: 4500 },
  { month: 'Feb', spending: 2100, income: 4500 },
  { month: 'Mar', spending: 2400, income: 4500 },
  { month: 'Apr', spending: 2000, income: 5000 },
];

export const mockHeatmapData = [
  { day: 'Mon', intensity: 2 },
  { day: 'Tue', intensity: 4 },
  { day: 'Wed', intensity: 1 },
  { day: 'Thu', intensity: 8 },
  { day: 'Fri', intensity: 5 },
  { day: 'Sat', intensity: 9 },
  { day: 'Sun', intensity: 3 },
];

export const mockBudgetLimits = [
  { category: 'Groceries', limit: 500, spent: 400 },
  { category: 'Dining', limit: 300, spent: 200 },
  { category: 'Utilities', limit: 200, spent: 150 },
  { category: 'Subscriptions', limit: 100, spent: 95 },
  { category: 'Entertainment', limit: 250, spent: 260 }, // over budget
];
