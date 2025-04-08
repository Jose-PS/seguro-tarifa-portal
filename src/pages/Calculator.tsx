
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layouts/MainLayout";

const InsuranceCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    insuranceType: "",
    coverage: "100000"
  });
  const [quote, setQuote] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    // Validate form
    if (!formData.name || !formData.age || !formData.insuranceType || !formData.coverage) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive"
      });
      return;
    }

    // Simple calculation example
    const age = parseInt(formData.age);
    const coverage = parseInt(formData.coverage);
    
    let basePremium = coverage * 0.01;
    
    // Age factor
    if (age < 25) {
      basePremium *= 1.5;
    } else if (age > 60) {
      basePremium *= 1.8;
    }
    
    // Insurance type factor
    switch (formData.insuranceType) {
      case "vida":
        basePremium *= 1.2;
        break;
      case "salud":
        basePremium *= 1.5;
        break;
      case "auto":
        basePremium *= 1.3;
        break;
      case "hogar":
        basePremium *= 0.9;
        break;
    }
    
    const finalQuote = Math.round(basePremium * 100) / 100;
    
    setQuote(finalQuote.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2
    }));
    
    toast({
      title: "Cotización Generada",
      description: "Se ha calculado la tarifa del seguro",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      insuranceType: "",
      coverage: "100000"
    });
    setQuote(null);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Calculadora de Tarifas</h1>
          <p className="text-muted-foreground mt-2">
            Calcule rápidamente las tarifas de seguros para sus clientes
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 shadow">
            <CardHeader>
              <CardTitle>Datos del Cliente</CardTitle>
              <CardDescription>Ingrese la información para calcular la tarifa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nombre del Cliente"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input 
                  id="age" 
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="Edad del Cliente"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceType">Tipo de Seguro</Label>
                <Select 
                  value={formData.insuranceType}
                  onValueChange={(value) => handleChange("insuranceType", value)}
                >
                  <SelectTrigger id="insuranceType">
                    <SelectValue placeholder="Seleccionar tipo de seguro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vida">Seguro de Vida</SelectItem>
                    <SelectItem value="salud">Seguro de Salud</SelectItem>
                    <SelectItem value="auto">Seguro de Auto</SelectItem>
                    <SelectItem value="hogar">Seguro de Hogar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverage">Cobertura (€)</Label>
                <Input 
                  id="coverage" 
                  type="number"
                  value={formData.coverage}
                  onChange={(e) => handleChange("coverage", e.target.value)}
                  placeholder="Monto de cobertura"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Limpiar
              </Button>
              <Button onClick={calculateQuote}>
                Calcular Tarifa
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="lg:col-span-2 shadow">
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
              <CardDescription>Cotización estimada del seguro</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              {quote ? (
                <>
                  <span className="text-sm text-muted-foreground">Prima Anual</span>
                  <span className="text-3xl font-bold text-primary mt-2">{quote}</span>
                  <Separator className="my-4" />
                  <span className="text-sm text-muted-foreground">Prima Mensual</span>
                  <span className="text-xl font-semibold text-secondary mt-1">
                    {(parseFloat(quote.replace(/[^\d.,]/g, '').replace(',', '.')) / 12)
                      .toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 2
                      })}
                  </span>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Complete los datos y pulse "Calcular Tarifa" para obtener la cotización
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-center">
              {quote && (
                <Button variant="outline" className="w-full">
                  Generar Informe
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default InsuranceCalculator;
