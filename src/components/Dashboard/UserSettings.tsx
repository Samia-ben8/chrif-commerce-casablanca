
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User } from 'lucide-react';

const UserSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres du compte</CardTitle>
        <CardDescription>
          Gérez vos préférences de compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Modifier le mot de passe
        </Button>
        
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Préférences de notification
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
