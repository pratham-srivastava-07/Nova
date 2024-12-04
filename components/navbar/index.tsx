"use client"

import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../buttons/mode-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter()
  function handleLogout() {
    setIsAuthenticated(false);
    router.push('/')
    localStorage.removeItem("token");
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")}
        >
          <span className="text-3xl font-bold text-primary tracking-tight">
            Nova
          </span>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>

            {isAuthenticated && (
              <NavigationMenuItem>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-destructive/10 hover:text-destructive",
                    "focus:ring-2 focus:ring-destructive/50"
                  )}
                >
                  Log Out
                </Button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}