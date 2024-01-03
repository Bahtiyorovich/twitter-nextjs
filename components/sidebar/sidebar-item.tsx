import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  label: string
  icon: LucideIcon
}

const SidebarItem = ({icon: Icon, label}: Props) => {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEMS */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white"/>
      </div>

      {/* DESCTOP SIDEBAR ITEMS */}
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center w-full">
        <Icon size={28} color="white"/>
        <p className="text-sm font-medium text-white w-full">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem