
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

interface UserProfileProps {
  user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Gérez vos informations de compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nom</label>
          <p className="text-lg">{user?.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-lg">{user?.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Téléphone</label>
          <p className="text-lg">{user?.phone || 'Non renseigné'}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Adresse</label>
          <p className="text-lg">{user?.address || 'Non renseignée'}</p>
        </div>
        
        <Button>Modifier le profil</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
