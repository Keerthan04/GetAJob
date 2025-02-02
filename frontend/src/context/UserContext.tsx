import { User } from '@/types';
import { createContext,useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<
  | {
      userData: User | null;
      setUserData: React.Dispatch<React.SetStateAction<User | null>>;
    }
  | undefined
>({
  userData: null,
  setUserData: () => {},
});

const UserContext = ({children}: {children: React.ReactNode}) => {
  const [userData, setUserData] = useState<User | null>(null);
  return (
    <div>
      <UserDataContext.Provider value={{userData, setUserData}}>e
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
