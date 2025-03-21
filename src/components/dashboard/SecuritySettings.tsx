
import React, { useState } from 'react';
import { Bell, Key, ShieldCheck, Smartphone, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginHistory {
  id: number;
  date: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}

const SecuritySettings = () => {
  const { t } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const loginHistory: LoginHistory[] = [
    {
      id: 1,
      date: "Aujourd'hui, 10:23",
      device: "Chrome sur Windows",
      location: "Paris, France",
      status: "success"
    },
    {
      id: 2,
      date: "Hier, 15:45",
      device: "Application mobile sur Android",
      location: "Lyon, France",
      status: "success"
    },
    {
      id: 3,
      date: "Il y a 3 jours, 08:12",
      device: "Safari sur macOS",
      location: "Bruxelles, Belgique",
      status: "failed"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4 text-security-foreground">{t('notifications')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-security-foreground">{t('email_notifications')}</p>
                  <p className="text-sm text-security-muted">{t('receive_email_alerts')}</p>
                </div>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-security-foreground">{t('sms_notifications')}</p>
                  <p className="text-sm text-security-muted">{t('receive_sms_alerts')}</p>
                </div>
              </div>
              <Switch 
                checked={smsNotifications} 
                onCheckedChange={setSmsNotifications} 
              />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-medium mb-4 text-security-foreground">{t('authentication')}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-security-foreground">{t('two_factor_authentication')}</p>
                    <p className="text-sm text-security-muted">{t('secure_account_further')}</p>
                  </div>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Key className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-security-foreground">{t('password')}</p>
                    <p className="text-sm text-security-muted">{t('last_changed')} 30 {t('days_ago')}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t('change')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-security-foreground">{t('login_history')}</h3>
            <Button variant="outline" size="sm">{t('view_all')}</Button>
          </div>
          
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className="p-3 border-b border-gray-100 last:border-0">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-security-muted mr-3 mt-0.5" />
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-security-foreground">{login.device}</p>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        login.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {login.status === 'success' ? t('successful') : t('failed')}
                      </span>
                    </div>
                    <p className="text-sm text-security-muted">{login.location}</p>
                    <p className="text-xs text-security-muted">{login.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
