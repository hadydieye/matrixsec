import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Shield, 
  Trophy, 
  Calendar, 
  Mail, 
  Clock,
  Star,
  Edit,
  Save,
  X
} from "lucide-react";

const userProfile = {
  name: "Alex Dubois",
  email: "alex.dubois@example.com",
  avatar: "",
  joinDate: "15 janvier 2024",
  lastActive: "Aujourd'hui à 14:30",
  level: "Intermédiaire",
  xp: 2840,
  totalTime: "34h 15min",
  streak: 7,
  badges: 5,
  completedModules: 12,
  averageScore: 84,
  preferences: {
    emailNotifications: true,
    darkMode: true,
    language: "Français",
    difficulty: "Intermédiaire"
  }
};

const achievements = [
  { name: "Premier Pas", icon: "🏆", date: "15 Jan 2024" },
  { name: "Quiz Master", icon: "🎯", date: "20 Jan 2024" },
  { name: "Hacker Éthique", icon: "🛡️", date: "1 Fév 2024" },
  { name: "Red Team Rookie", icon: "⚡", date: "10 Fév 2024" },
  { name: "Assidu", icon: "📅", date: "15 Fév 2024" }
];

const recentModules = [
  { name: "Analyse Réseau Avancée", category: "Hacking Éthique", score: 89, date: "20 Fév 2024" },
  { name: "Social Engineering", category: "Red Teaming", score: 91, date: "16 Fév 2024" },
  { name: "Méthodologie OSINT", category: "Hacking Éthique", score: 87, date: "12 Fév 2024" }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSave = () => {
    // Ici vous implémenteriez la sauvegarde via votre API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-glow-primary">Profil Utilisateur</h1>
          <p className="text-xl text-muted-foreground">
            Gérez votre profil, suivez vos performances et personnalisez votre expérience.
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-primary text-glow-primary">{userProfile.name}</h2>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {userProfile.email}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                      {userProfile.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Membre depuis le {userProfile.joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="btn-glass"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier le Profil
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary text-glow-primary">{userProfile.badges}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary text-glow-secondary">{userProfile.completedModules}</div>
              <div className="text-sm text-muted-foreground">Modules</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent text-glow-accent">{userProfile.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Score Moyen</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary text-glow-primary">{userProfile.totalTime}</div>
              <div className="text-sm text-muted-foreground">Temps Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/30 backdrop-blur-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Vue d'Ensemble
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Accomplissements
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              Activité
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Informations Personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                          className="bg-card/50 backdrop-blur-xl border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                          className="bg-card/50 backdrop-blur-xl border-border"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} className="btn-matrix">
                          <Save className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="btn-glass">
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-muted-foreground">Nom complet</Label>
                        <p className="font-medium">{userProfile.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="font-medium">{userProfile.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Dernière connexion</Label>
                        <p className="font-medium">{userProfile.lastActive}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-secondary" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Niveau actuel</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {userProfile.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points XP</span>
                    <span className="font-bold text-primary">{userProfile.xp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Série actuelle</span>
                    <span className="font-bold text-secondary">{userProfile.streak} jours</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temps d'étude</span>
                    <span className="font-bold text-accent">{userProfile.totalTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="glass-card hover-glow text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-lg text-primary text-glow-primary mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Obtenu le {achievement.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Modules Récents</CardTitle>
                <CardDescription>Vos derniers modules terminés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentModules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{module.name}</h4>
                        <p className="text-sm text-muted-foreground">{module.category} • {module.date}</p>
                      </div>
                      <Badge 
                        className={`${
                          module.score >= 90 ? 'bg-primary/20 text-primary border-primary/30' :
                          module.score >= 75 ? 'bg-secondary/20 text-secondary border-secondary/30' :
                          'bg-accent/20 text-accent border-accent/30'
                        }`}
                      >
                        {module.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Préférences
                </CardTitle>
                <CardDescription>
                  Personnalisez votre expérience sur MatrixSec
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="language">Langue</Label>
                  <Input
                    id="language"
                    value={userProfile.preferences.language}
                    disabled
                    className="bg-card/50 backdrop-blur-xl border-border mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="difficulty">Niveau de Difficulté Préféré</Label>
                  <Input
                    id="difficulty"
                    value={userProfile.preferences.difficulty}
                    disabled
                    className="bg-card/50 backdrop-blur-xl border-border mt-2"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications par Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications sur vos progrès
                    </p>
                  </div>
                  <Badge className={userProfile.preferences.emailNotifications ? 
                    "bg-primary/20 text-primary border-primary/30" : 
                    "bg-muted/20 text-muted-foreground border-muted/30"
                  }>
                    {userProfile.preferences.emailNotifications ? "Activé" : "Désactivé"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mode Sombre</Label>
                    <p className="text-sm text-muted-foreground">
                      Interface en mode sombre (recommandé)
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Activé
                  </Badge>
                </div>

                <Separator />

                <div className="flex space-x-4">
                  <Button className="btn-matrix">
                    Sauvegarder les Préférences
                  </Button>
                  <Button variant="outline" className="btn-glass">
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}