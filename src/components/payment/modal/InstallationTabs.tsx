
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobilePWA from './MobilePWA';
import ShortcutInstall from './ShortcutInstall';

interface InstallationTabsProps {
  installationTab: string;
  setInstallationTab: (tab: string) => void;
  isMobile: boolean;
  deferredPrompt: any;
  downloadStarted: boolean;
  downloadError: boolean | undefined;
  startInstallation: () => Promise<void>;
  handleDownload: () => void;
  handleReset: () => void;
  shortcutCreated: boolean;
  handleCreateShortcut: () => void;
  setUserMadeChoice: (choice: boolean) => void;
}

const InstallationTabs: React.FC<InstallationTabsProps> = ({ 
  installationTab,
  setInstallationTab,
  isMobile,
  deferredPrompt,
  downloadStarted,
  downloadError,
  startInstallation,
  handleDownload,
  handleReset,
  shortcutCreated,
  handleCreateShortcut,
  setUserMadeChoice
}) => {
  // Update user choice status based on current installation state
  useEffect(() => {
    console.log('Installation tab state check:', {
      installationTab,
      deferredPrompt: deferredPrompt === null ? 'null' : 'available',
      shortcutCreated,
      timestamp: new Date().toISOString()
    });
    
    // Check if either option was successfully completed
    // For PWA: installationTab is 'pwa' and deferredPrompt is null (meaning it was used)
    // For shortcut: installationTab is 'shortcut' and shortcut was created
    const pwaInstalled = installationTab === 'pwa' && deferredPrompt === null;
    const shortcutCreatedSuccessfully = installationTab === 'shortcut' && shortcutCreated;
    
    if (pwaInstalled || shortcutCreatedSuccessfully) {
      console.log('Setting user choice made: true -', 
        pwaInstalled ? 'PWA installed' : 'Shortcut created', 
        new Date().toISOString()
      );
      sessionStorage.setItem('installationChoiceMade', 'true');
      setUserMadeChoice(true);
    }
  }, [installationTab, deferredPrompt, shortcutCreated, setUserMadeChoice]);

  return (
    <Tabs 
      defaultValue={installationTab} 
      value={installationTab} 
      onValueChange={(value) => {
        console.log('Tab changed to:', value, new Date().toISOString());
        setInstallationTab(value);
      }}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pwa" disabled={!isMobile && !deferredPrompt}>
          Installer PWA
        </TabsTrigger>
        <TabsTrigger value="shortcut">
          Raccourci
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pwa">
        <MobilePWA 
          deferredPrompt={deferredPrompt}
          onDownload={() => {
            console.log('Starting PWA installation', new Date().toISOString());
            startInstallation()
              .then(() => {
                console.log('PWA installation completed', new Date().toISOString());
                sessionStorage.setItem('installationChoiceMade', 'true');
                setUserMadeChoice(true);
              })
              .catch(err => {
                console.error('PWA installation failed:', err, new Date().toISOString());
              });
          }}
        />
      </TabsContent>
      
      <TabsContent value="shortcut">
        <ShortcutInstall 
          shortcutCreated={shortcutCreated}
          onCreateShortcut={() => {
            console.log('Creating shortcut', new Date().toISOString());
            handleCreateShortcut();
            // The setUserMadeChoice is updated in the parent component
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InstallationTabs;
