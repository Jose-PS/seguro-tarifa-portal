
import React from "react";
import { Shield } from "lucide-react";

interface InsuranceLogoProps {
  className?: string;
}

const InsuranceLogo = ({ className = "h-8 w-8" }: InsuranceLogoProps) => {
  return (
    <div className={`relative ${className} text-primary`}>
      <Shield className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xs font-bold">S</div>
      </div>
    </div>
  );
};

export default InsuranceLogo;
