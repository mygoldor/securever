
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const CtaSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-white opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            {t('cta_subtitle')}
          </p>
          
          <div className="mt-4">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link to="/signup">
                {t('signup_now')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
