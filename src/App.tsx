import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { TransactionsPage } from './pages/TransactionsPage'
import { InsightsPage } from './pages/InsightsPage'
import { SavingsPage } from './pages/insights/SavingsPage'
import { SpendingPage } from './pages/insights/SpendingPage'
import { BillsPage } from './pages/insights/BillsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BudgetPage } from './pages/BudgetPage'
import { SavingsGoalsPage } from './pages/SavingsGoalsPage'
import { ReportsPage } from './pages/ReportsPage'
import { FilterProvider } from './context/FilterContext'
import { CSVProvider } from './context/CSVContext'

function App() {
  return (
    <BrowserRouter>
      <CSVProvider>
        <FilterProvider>
          <Routes>
            {/* HomePage integrates the Scroll Layout containing the Welcome Hero and Dashboard internally via motion tracking */}
            <Route path="/" element={<HomePage />} />
            
            {/* Extended Route Wrapper persisting core sidebars dynamically bypassing Scroll Hero */}
            <Route element={<DashboardLayout />}>
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/savings" element={<SavingsPage />} />
              <Route path="/insights/spending" element={<SpendingPage />} />
              <Route path="/insights/bills" element={<BillsPage />} />
              
              {/* Premium Core Global Navigation Nodes */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/savings" element={<SavingsGoalsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
          </Routes>
        </FilterProvider>
      </CSVProvider>
    </BrowserRouter>
  )
}

export default App
