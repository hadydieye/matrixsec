import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Clock, Star, TrendingUp, Award, Calendar, BarChart3 } from "lucide-react";

const progressData = {
  overall: {
    totalModules: 32,
    completedModules: 12,
    totalQuizzes: 47,
    completedQuizzes: 28,
    totalTime: "34h 15min",
    averageScore: 84,
    level: "Intermédiaire",
    xp: 2840,
    nextLevelXp: 3500
  },
  categories: [
    {
      name: "Hacking Éthique",
      color: "primary",
      completed: 8,
      total: 14,
      avgScore: 87,
      timeSpent: "18h 30min",
      badges: 4
    },
    {
      name: "Red Teaming", 
      color: "secondary",
      completed: 3,
      total: 9,
      avgScore: 81,
      timeSpent: "12h 45min",
      badges: 2
    },
    {
      name: "Blue Teaming",
      color: "accent", 
      completed: 1,
      total: 9,
      avgScore: 78,
      timeSpent: "3h",
      badges: 1
    }
  ],
  badges: [
    { id: 1, name: "Premier Pas", description: "Terminé votre premier module", icon: "🏆", earned: true, date: "2024-01-15" },
    { id: 2, name: "Quiz Master", description: "Score parfait sur 5 quiz", icon: "🎯", earned: true, date: "2024-01-20" },
    { id: 3, name: "Hacker Éthique", description: "Terminé 5 modules de hacking éthique", icon: "🛡️", earned: true, date: "2024-02-01" },
    { id: 4, name: "Red Team Rookie", description: "Premier module Red Team terminé", icon: "⚡", earned: true, date: "2024-02-10" },
    { id: 5, name: "Assidu", description: "7 jours d'affilée sur la plateforme", icon: "📅", earned: true, date: "2024-02-15" },
    { id: 6, name: "Expert", description: "Score moyen > 90%", icon: "🌟", earned: false, date: null },
    { id: 7, name: "Blue Shield", description: "Terminé 3 modules Blue Team", icon: "🛡️", earned: false, date: null },
    { id: 8, name: "Perfectionniste", description: "100% sur tous les quiz d'un module", icon: "💎", earned: false, date: null }
  ],
  recentActivity: [
    { date: "2024-02-20", type: "module", title: "Analyse Réseau Avancée", score: 89 },
    { date: "2024-02-19", type: "quiz", title: "Techniques de Scanning", score: 94 },
    { date: "2024-02-18", type: "badge", title: "Badge 'Assidu' obtenu", score: null },
    { date: "2024-02-17", type: "quiz", title: "Méthodologie OSINT", score: 87 },
    { date: "2024-02-16", type: "module", title: "Introduction au Social Engineering", score: 91 }
  ]
};

export default function Progress() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "text-primary text-glow-primary";
      case "secondary": return "text-secondary text-glow-secondary";
      case "accent": return "text-accent text-glow-accent";
      default: return "text-primary text-glow-primary";
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case "primary": return "bg-gradient-primary";
      case "secondary": return "bg-gradient-secondary";
      case "accent": return "bg-gradient-accent";
      default: return "bg-gradient-primary";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "module": return <Target className="h-4 w-4 text-primary" />;
      case "quiz": return <Trophy className="h-4 w-4 text-secondary" />;
      case "badge": return <Award className="h-4 w-4 text-accent" />;
      default: return <Star className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-glow-primary">Progression & Statistiques</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Suivez votre parcours d'apprentissage, vos performances et débloquez de nouveaux badges.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Niveau Actuel</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary text-glow-primary">{progressData.overall.level}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">XP: {progressData.overall.xp}</span>
                <span className="text-xs text-muted-foreground">/{progressData.overall.nextLevelXp}</span>
              </div>
              <ProgressBar 
                value={(progressData.overall.xp / progressData.overall.nextLevelXp) * 100} 
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Modules Terminés</CardTitle>
              <Target className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary text-glow-secondary">
                {progressData.overall.completedModules}/{progressData.overall.totalModules}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((progressData.overall.completedModules / progressData.overall.totalModules) * 100)}% complété
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Score Moyen</CardTitle>
              <Star className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent text-glow-accent">{progressData.overall.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Sur {progressData.overall.completedQuizzes} quiz terminés
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Temps Total</CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary text-glow-primary">{progressData.overall.totalTime}</div>
              <p className="text-xs text-muted-foreground">
                Temps d'apprentissage
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/30 backdrop-blur-xl">
            <TabsTrigger value="categories" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Par Domaine
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Badges
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              Activité
            </TabsTrigger>
          </TabsList>

          {/* Categories Progress */}
          <TabsContent value="categories" className="space-y-6">
            {progressData.categories.map((category) => (
              <Card key={category.name} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-2xl ${getColorClasses(category.color)}`}>
                      {category.name}
                    </CardTitle>
                    <Badge className={`bg-${category.color}/20 text-${category.color} border-${category.color}/30`}>
                      {category.badges} badges
                    </Badge>
                  </div>
                  <CardDescription>
                    Progression dans le domaine {category.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getColorClasses(category.color)}`}>
                        {category.completed}/{category.total}
                      </div>
                      <div className="text-sm text-muted-foreground">Modules</div>
                    <ProgressBar 
                        value={(category.completed / category.total) * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getColorClasses(category.color)}`}>
                        {category.avgScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Score Moyen</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getColorClasses(category.color)}`}>
                        {category.timeSpent}
                      </div>
                      <div className="text-sm text-muted-foreground">Temps Passé</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getColorClasses(category.color)}`}>
                        {Math.round((category.completed / category.total) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Progression</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Badges */}
          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {progressData.badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`glass-card ${badge.earned ? 'border-primary/50 hover-glow' : 'opacity-60'}`}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <CardTitle className={`text-lg ${badge.earned ? 'text-primary text-glow-primary' : 'text-muted-foreground'}`}>
                      {badge.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    {badge.earned ? (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Obtenu le {badge.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        À débloquer
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity */}
          <TabsContent value="activity">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Activité Récente
                </CardTitle>
                <CardDescription>
                  Vos dernières actions sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getActivityIcon(activity.type)}
                        <div>
                          <div className="font-medium text-foreground">{activity.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {activity.date}
                          </div>
                        </div>
                      </div>
                      {activity.score && (
                        <Badge 
                          className={`${
                            activity.score >= 90 ? 'bg-primary/20 text-primary border-primary/30' :
                            activity.score >= 75 ? 'bg-secondary/20 text-secondary border-secondary/30' :
                            'bg-accent/20 text-accent border-accent/30'
                          }`}
                        >
                          {activity.score}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}