
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Trash2 } from 'lucide-react';

const UserManagement = () => {
  // Mock data - replace with real data later
  const users = [
    {
      id: 'user-1',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      totalOrders: 5
    },
    {
      id: 'user-2',
      name: 'Fatima Alami',
      email: 'fatima.alami@email.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      totalOrders: 3
    },
    {
      id: 'admin-1',
      name: 'Administrateur CHRIF',
      email: 'admin@droguerie-chrif.ma',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-20',
      totalOrders: 0
    }
  ];

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Gestion des utilisateurs</span>
          </CardTitle>
          <CardDescription>
            Gérez les comptes utilisateurs de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Inscrit le {user.joinDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.totalOrders}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        {user.role !== 'admin' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
