
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PaymentSuccessGuardProps {
  children: React.ReactNode;
}

const PaymentSuccessGuard: React.FC<PaymentSuccessGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSuccessfulPayment = sessionStorage.getItem('paymentSuccessful') === 'true';
    const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
    
    // For testing purposes, you can temporarily enable this line
    // sessionStorage.setItem('paymentSuccessful', 'true');
    
    if (!hasSuccessfulPayment) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette page n'est accessible qu'après un paiement réussi.",
      });
      navigate('/payment');
    } else if (hasUserMadeChoice) {
      // Force redirect to dashboard with a small delay to ensure state updates
      setTimeout(() => {
        navigate('/dashboard');
      }, 300);
    } else {
      setIsVerified(true);
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  // Check periodically if the installation choice was made in another component
  useEffect(() => {
    if (isVerified) {
      const checkInterval = setInterval(() => {
        const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
        if (hasUserMadeChoice) {
          clearInterval(checkInterval);
          navigate('/dashboard');
        }
      }, 1000);
      
      return () => clearInterval(checkInterval);
    }
  }, [isVerified, navigate]);

  useEffect(() => {
    // Handle page navigation attempts
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (isVerified && !hasUserMadeChoice) {
        const message = 'Vous devez choisir une option d\'installation avant de quitter.';
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    // Prevent back button navigation
    const handlePopState = () => {
      const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (isVerified && !hasUserMadeChoice) {
        window.history.pushState(null, '', window.location.pathname);
        toast({
          variant: "destructive",
          title: "Action requise",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
      }
    };

    if (isVerified) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      window.history.pushState(null, '', window.location.pathname);
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isVerified, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};

export default PaymentSuccessGuard;
