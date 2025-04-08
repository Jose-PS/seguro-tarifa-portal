
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, AreaChart, PieChart } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const dashboardCards = [
    {
      title: "Cotizaciones Nuevas",
      description: "Crear y gestionar nuevas cotizaciones",
      icon: <BarChart className="h-8 w-8 text-primary" />,
      action: () => navigate("/calculator")
    },
    {
      title: "Pólizas Activas",
      description: "Ver y administrar pólizas vigentes",
      icon: <PieChart className="h-8 w-8 text-primary" />,
      action: () => toast({
        title: "Próximamente",
        description: "Esta funcionalidad estará disponible pronto",
      })
    },
    {
      title: "Reportes",
      description: "Análisis y estadísticas de seguros",
      icon: <AreaChart className="h-8 w-8 text-primary" />,
      action: () => toast({
        title: "Próximamente",
        description: "Esta funcionalidad estará disponible pronto",
      })
    }
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bienvenido al Panel</h1>
          <p className="text-muted-foreground mt-2">
            Sistema de Tarificación de Seguros Empresariales
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{card.title}</CardTitle>
                  <div>{card.icon}</div>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={card.action} 
                  variant="outline" 
                  className="w-full"
                >
                  Acceder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
