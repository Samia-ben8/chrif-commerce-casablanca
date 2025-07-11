
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartButton from '@/components/Cart/CartButton';
import CartSidebar from '@/components/Cart/CartSidebar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Catégories', href: '/categories' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/85f519b1-eaa4-4474-bd5f-d5f0bf6b219d.png" 
                alt="Droguerie CHRIF Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-primary">Droguerie CHRIF</h1>
              <p className="text-xs text-muted-foreground">Casablanca, Maroc</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Panier */}
            <CartButton onClick={() => setIsCartOpen(true)} />

            {/* Compte utilisateur */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {user?.role === 'admin' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <User className="h-5 w-5 mr-2" />
                        <span className="hidden sm:inline">
                          Administrateur CHRIF
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Compte
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      <User className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">{user?.name}</span>
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Connexion</span>
                </Link>
              </Button>
            )}

            {/* Menu mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        {user?.role === 'admin' && (
                          <>
                            <Button asChild className="w-full mb-2" variant="outline">
                              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                Compte
                              </Link>
                            </Button>
                            <Button asChild className="w-full mb-2" variant="outline">
                              <Link to="/admin" onClick={() => setIsOpen(false)}>
                                Admin
                              </Link>
                            </Button>
                          </>
                        )}
                        {user?.role !== 'admin' && (
                          <Button asChild className="w-full mb-2">
                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                              Mon compte
                            </Link>
                          </Button>
                        )}
                        <Button variant="outline" onClick={logout} className="w-full">
                          Se déconnecter
                        </Button>
                      </div>
                    ) : (
                      <Button asChild className="w-full mb-2">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          Se connecter
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
