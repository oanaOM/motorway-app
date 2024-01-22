import { createContext, useContext, useReducer } from 'react';

type Search = {
  tag: string;
};

export type Car = {
  id: string;
  created_at: string;
  updated_at: string;
  color: string;
  description?: string;
  tags: string[];
  likes: number;
  user: string;
  url: string;
};

type Data = {
  search: Search;
  car?: Car[];
};

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<Data>(null);
const AppContextDispatch = createContext(null);

const initialAppContext = {
  search: '',
};

function appContextReducer(data, action) {
  switch (action.type) {
    case 'UPDATE_TAGS': {
      return {
        ...data,
        search: { tag: action.tag },
      };
    }

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [data, dispatch] = useReducer(appContextReducer, initialAppContext);
  return (
    <>
      <AppContext.Provider value={data}>
        <AppContextDispatch.Provider value={dispatch}>{children}</AppContextDispatch.Provider>
      </AppContext.Provider>
    </>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

export function useAppContextDispatch() {
  return useContext(AppContextDispatch);
}
