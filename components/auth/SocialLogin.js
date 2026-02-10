import { useGoogleLogin } from '@react-oauth/google';
import React from 'react'
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLoginMutation } from '@/services/authApi';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation();


  const handleGoogle = useGoogleLogin({

    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleLogin({
          code: tokenResponse?.code,
        }).unwrap();
        setCookie("authKey", "valid")
        router.push(redirectUrl || '/');
        toast.success(response?.message)
        // if (response) {
        //   console.log(response?.authToken, "token");
        //   // dispatch(setAuthToken(response?.authToken))
        //   // setCookie("authToken", response?.authToken);
        //   // router.push(ROUTES.plans);
        // }
      }
      catch (error) {
        console.log("Error in google login:", error)
      }
    },
    flow: 'auth-code',
  });
  return (

    <Button
      type="button"
      variant="outline"
      className="w-full h-11 border-2 border-white/30 hover:border-white/60 backdrop-blur-sm bg-white/20 hover:bg-white/50 text-black font-medium shadow-lg cursor-pointer"
      onClick={handleGoogle}
    >
      <FcGoogle size={24} />
      Continue with Google
    </Button>

  )
}

export default SocialLogin