"use client";
import { Calendar, List, LogOut, Menu, MessageSquare, Target, TreePalm, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { useGetUserRoleQuery, userApi } from '@/services/userApi';
import { toast } from 'sonner';
import { useLogOutMutation } from '@/services/authApi';
import { useDispatch } from 'react-redux';
import { deleteCookie, setCookie } from 'cookies-next';
import { setIsLogin } from '@/services/globalSlice';

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
    // { name: 'Messages', page: '/messages', icon: MessageSquare },
    { name: 'Profile', page: '/profile', icon: Users },
  ];


  const handleLogout = async () => {
    try {
      const res = await Logout().unwrap();
      deleteCookie('role')
      // dispatch(userApi.util.resetApiState())
      toast.success(res?.message)
      router.push("/login");
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }


  useEffect(() => {
    if (userRoleInfo?.data?.user?.role) {
      const role = userRoleInfo?.data?.user?.vendorId ? 'VENDOR' : userRoleInfo?.data?.user?.role
      setCookie("role", role)
      dispatch(setIsLogin(true))
    }else{
      dispatch(setIsLogin(false))
    }
  }, [userRoleInfo])


  return (
    <nav className="transition-all  ease-in-out duration-300 py-1 px-2 fixed top-0 left-0 right-0 z-50  border-slate-100">
      <div className="max-w-7xl mx-auto rounded-2xl bg-white/40 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center border-2 border-sky-500">
              <TreePalm className="w-8 h-8 text-sky-600" />
            </div> */}
            <img src={"/island_logo.png"} alt="Logo" className="w-12 h-10" />
            <span className="font-bold text-xl text-slate-900 hidden sm:block">Island 360</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
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
              userRoleInfo?.data?.user ?
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLogout()}
                  title="Logout"
                  className="text-slate-600 hover:text-slate-900"
                >
                  <LogOut className="w-5 h-5" />
                </Button> : <Link href={"/login"}>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
            }
            {/* <CartButton /> */}
            {
              // isAuthenticated && (
              //   <>
              //     <NotificationBell />
              //     {/* <Link to={createPageUrl('VendorSignup')}>
              //       <Button variant="outline" size="sm">
              //         Join as Vendor
              //       </Button>
              //     </Link> */}
              //     <Button
              //       variant="ghost"
              //       size="icon"
              //       onClick={() => base44.auth.logout()}
              //       title="Logout"
              //       className="text-slate-600 hover:text-slate-900"
              //     >
              //       <LogOut className="w-5 h-5" />
              //     </Button>
              //   </>
              // )
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
                  {navItems.map((item) => {
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


                  {/* {isAuthenticated && (
                    <>
                      <Link to={createPageUrl('VendorSignup')} onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Join as Vendor
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-600 hover:text-slate-900"
                        onClick={() => base44.auth.logout()}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  )} */}
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