
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User } from 'lucide-react';
import ChangePasswordDialog from './ChangePasswordDialog';

const UserSettings = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du compte</CardTitle>
          <CardDescription>
            Gérez vos préférences de compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" onClick={() => setIsPasswordDialogOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Modifier le mot de passe
          </Button>
          
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Préférences de notification
          </Button>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      />
    </>
  );
};

export default UserSettings;
