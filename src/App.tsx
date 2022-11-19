import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import DisplayUsers from './components/displayUsers';

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <DisplayUsers />
      </QueryClientProvider>
    </div>
  );
}

export default App;
