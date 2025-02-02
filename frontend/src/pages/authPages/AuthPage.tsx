import Auth from "@/components/auth/Auth";
import {Toaster} from 'sonner';

const AuthPage = () => {
  return <>
    <Toaster position="top-right" richColors />
    <Auth />;
  </>
};

export default AuthPage;
