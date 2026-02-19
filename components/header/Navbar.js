"use client";
import { Calendar, List, LogIn, LogOut, Menu, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { useGetUserRoleQuery } from '@/services/userApi';
import { toast } from 'sonner';
import { useLogOutMutation } from '@/services/authApi';
import { useDispatch } from 'react-redux';
import { deleteCookie, setCookie } from 'cookies-next';
import { setIsLogin, setSignUp } from '@/services/globalSlice';
import { ROLES } from '@/lib/utils';
import { RiUserAddLine } from "react-icons/ri";


const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathName = usePathname()
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const [Logout, { isLoading }] = useLogOutMutation()
  const navItems = [
    { name: 'Home', page: '/', icon: Target },
    { name: 'My Bookings', page: '/mybookings', icon: Calendar },
    { name: 'Profile', page: '/profile', icon: Users },
    // { name: 'Messages', page: '/messages', icon: MessageSquare },
  ];


  const handleLogout = async () => {
    try {
      const res = await Logout().unwrap();
      deleteCookie('role')
      deleteCookie('authKey')
      router.push("/login");
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }


  useEffect(() => {
    if (userRoleInfo?.data?.user?.role) {
      const role = userRoleInfo?.data?.user?.role === ROLES.supAdmin || userRoleInfo?.data?.user?.role === ROLES.admin ? userRoleInfo?.data?.user?.role : userRoleInfo?.data?.user?.vendorId ? 'VENDOR' : userRoleInfo?.data?.user?.role
      setCookie("role", role)
      dispatch(setIsLogin(true))
    } else {
      dispatch(setIsLogin(false))
    }
  }, [userRoleInfo])


  return (
    <nav className="transition-all  ease-in-out duration-300 py-1 px-2 fixed top-0 left-0 right-0 z-50  border-slate-100">
      <div className="max-w-7xl mx-auto rounded-2xl bg-white/20 sm:bg-white/30 backdrop-blur-[3px] sm:backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <img src={"/island_logo.png"} alt="Logo" className="w-16 h-12" />
            {/* <span className="font-bold text-xl text-slate-900 hidden sm:block">Island 360</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {userRoleInfo?.data?.user && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathName === item.page;
              return (
                <Link
                  href={item.page}
                  key={item.page}
                  className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
            `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            {
              userRoleInfo?.data?.user?.vendorId && <Link
                href={'/myactivities'}
                className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${pathName == '/myactivities'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
            `}
              >
                <List className="w-4 h-4" />
                My Activities
              </Link>
            }
            {
              userRoleInfo?.data?.user &&
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLogout()}
                title="Logout"
                className="text-slate-600 hover:text-slate-900"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            }
            {
              !userRoleInfo?.data?.user && !userRoleInfoFetching &&
            <div className='flex items-center gap-2'>
              <Button
                onClick={() => {
                  dispatch(setSignUp("signin"))
                  router.push("/login")
                }}
                className={"bg-amber-300 hover:bg-black h-9  hover:text-white border-0 px-7 py-4"} variant="outline" size="sm">
                <LogIn className="w-5 h-5" />
                Login
              </Button>
              <Button
                onClick={() => {
                  dispatch(setSignUp("signup"))
                  router.push("/login")
                }}
                className={"bg-amber-300 hover:bg-black h-9 hover:text-white border-0 px-7 py-4"} variant="outline" size="sm">
                <RiUserAddLine className="w-5 h-5" />
                Signup
              </Button>
            </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* <CartButton /> */}
            {/* {isAuthenticated && <NotificationBell />} */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className={"hidden"}>Mobile navigation</SheetTitle>
                <div className="flex flex-col gap-2 px-5 mt-12">
                  {!userRoleInfo?.data?.user &&
                    <Link
                      href={"/"}
                      className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${pathName == "/"
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }
            `}
                    >
                      <Target className="w-4 h-4" />
                      Home
                    </Link>
                  }
                  {userRoleInfo?.data?.user && navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathName === item.page;
                    return (
                      <Link
                        href={item.page}
                        key={item.page}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }
            `}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                  {
                    userRoleInfo?.data?.user?.vendorId &&
                    <Link
                      href={'/myactivities'}
                      className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${pathName == '/myactivities'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }
                    `}
                    >
                      <List className="w-4 h-4" />
                      My Activities
                    </Link>
                  }
                  {
                    userRoleInfo?.data?.user ?
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-600 hover:text-slate-900"
                        onClick={() => handleLogout()}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button> : <Link href={"/login"}>
                        <Button variant="outline" size="sm">
                          Sign In
                        </Button>
                      </Link>
                  }
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar