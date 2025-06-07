
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import EditProfileDialog from './EditProfileDialog';

interface UserProfileProps {
  user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    // In a real app, this would update the user in the backend
    setCurrentUser(prev => prev ? { ...prev, ...updatedUser } : null);
  };

  return (
    <>
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
            <p className="text-lg">{currentUser?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-lg">{currentUser?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Téléphone</label>
            <p className="text-lg">{currentUser?.phone || 'Non renseigné'}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Adresse</label>
            <p className="text-lg">{currentUser?.address || 'Non renseignée'}</p>
          </div>
          
          <Button onClick={() => setIsEditDialogOpen(true)}>Modifier le profil</Button>
        </CardContent>
      </Card>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={currentUser}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default UserProfile;
