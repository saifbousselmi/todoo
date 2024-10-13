import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';

const callsToAction = [
  { name: 'Watch demo', href: '/', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '/', icon: PhoneIcon },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#D3D3D3" }}>
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img 
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfj0XJdxu6yvvm38chcfDy_nhElecK9dnzg&s"
            className="h-14 w-full rounded-full"
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <Popover className="relative">
          <PopoverPanel
            transition
            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-4.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                >
                  <item.icon aria-hidden="true" className="h-5 w-5 flex-none" />
                  {item.name}
                </a>
              ))}
            </div>
          </PopoverPanel>
        </Popover>

        <NavLink
  to="/home"
  style={{ textDecoration: "none" }}
 className={({ isActive }) => 
        `transition-transform duration-300 ease-in-out delay-150 
         ${isActive ? 'text-lg text-slate-700' : 'text-sm text-slate-500'} 
         font-semibold leading-6 
         hover:text-lg hover:text-slate-700 
         hover:translate-y-[-10px]`
      }
>
  Home
</NavLink>
        <NavLink
          to="/todo-app"
          style={{textDecoration:"none"}}
         className={({ isActive }) => 
        `transition-transform duration-300 ease-in-out delay-150 
         ${isActive ? 'text-lg text-slate-700' : 'text-sm text-slate-500'} 
         font-semibold leading-6 
         hover:text-lg hover:text-slate-700 
         hover:translate-y-[-10px]`
      }
          >
          To-Do-App
        </NavLink>
        <NavLink
          to="/contact"
          style={{textDecoration:"none"}}
         className={({ isActive }) => 
        `transition-transform duration-300 ease-in-out delay-150 
         ${isActive ? 'text-lg text-slate-700' : 'text-sm text-slate-500'} 
         font-semibold leading-6 
         hover:text-lg hover:text-slate-700 
         hover:translate-y-[-10px]`
      }
          >
          Contact
        </NavLink>
      </PopoverGroup>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <NavLink
          to="/"
          style={{textDecoration:"none"}}
         className={({ isActive }) => 
        `transition-transform duration-300 ease-in-out delay-150 
         ${isActive ? 'text-lg text-slate-700' : 'text-sm text-slate-500'} 
         font-semibold leading-6 
         hover:text-lg hover:text-slate-700 
         hover:translate-y-[-10px]`
      }
          >
          Log in <span aria-hidden="true">&rarr;</span>
        </NavLink>
      </div>
    </nav>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div style={{ textDecoration: "none" }} className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <NavLink
                to="/"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                style={{ color: "#00008B" }}
              >
                Home
              </NavLink>
              <NavLink
                to="/todo-app"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                style={{ color: "#00008B" }}
              >
                To-Do-App
              </NavLink>
              <NavLink
                to="/contact"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                style={{ color: "#00008B" }}
              >
                Contact
              </NavLink>
            </div>
            <div className="py-6">
              <NavLink
                to="/"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                style={{ color: "#00008B" }}
              >
                Log in
              </NavLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
);
}