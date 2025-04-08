
import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, LayoutDashboard, Calculator, Menu, X, User, Settings } from "lucide-react";
import InsuranceLogo from "@/components/InsuranceLogo";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Sesión Cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    navigate("/");
  };

  const navigationItems = [
    {
      name: "Panel Principal",
      icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
      onClick: () => navigate("/dashboard")
    },
    {
      name: "Calculadora",
      icon: <Calculator className="h-5 w-5 mr-3" />,
      onClick: () => navigate("/calculator")
    }
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50"
          onClick={closeSidebar}
        />
      )}
    
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-sidebar border-r transition-transform duration-300 
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <InsuranceLogo />
              <div>
                <h1 className="font-semibold text-primary">Seguro Tarifa</h1>
                <p className="text-xs text-muted-foreground">Sistema Empresarial</p>
              </div>
            </div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  item.onClick();
                  closeSidebar();
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
          
          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Usuario Demo</p>
                <p className="text-xs text-muted-foreground">usuario@empresa.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => toast({
                  title: "Próximamente",
                  description: "Esta funcionalidad estará disponible pronto"
                })}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col ${!isMobile && 'ml-64'}`}>
        {/* Header */}
        <header className="h-16 border-b flex items-center px-4 justify-between">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="ml-auto flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
