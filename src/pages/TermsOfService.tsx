
import React from 'react';
import { Separator } from '@/components/ui/separator';
import TermsContent from '@/components/terms/TermsContent';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Conditions Générales d'Utilisation (CGU)</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 1 juin 2023</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-gray-800">
          <TermsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
