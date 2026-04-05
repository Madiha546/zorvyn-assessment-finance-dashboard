import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type FilterType = 'category' | 'card' | 'month';

export interface ActiveFilter {
  type: FilterType;
  value: string;
  color: string;
  label?: string; // e.g. "Showing: Groceries"
}

interface FilterContextType {
  activeFilter: ActiveFilter | null;
  setFilter: (filter: ActiveFilter) => void;
  clearFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);

  const setFilter = (filter: ActiveFilter) => {
    setActiveFilter(filter);
  };

  const clearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <FilterContext.Provider value={{ activeFilter, setFilter, clearFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useDashboardFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useDashboardFilter must be used within a FilterProvider');
  }
  return context;
}
