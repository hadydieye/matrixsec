import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Zap, Brain, Search, Clock, Target, Star, Filter } from "lucide-react";

const moduleData = {
  "hacking-ethique": {
    title: "Hacking Éthique",
    icon: Shield,
    color: "primary",
    description: "Apprentissage des techniques offensives pour mieux comprendre les vulnérabilités",
    modules: [
      { id: 1, title: "Introduction au Hacking Éthique", duration: "45min", quizzes: 8, difficulty: "Débutant", rating: 4.9 },
      { id: 2, title: "Configuration du Lab", duration: "1h 30min", quizzes: 12, difficulty: "Débutant", rating: 4.8 },
      { id: 3, title: "Maîtrise de Linux", duration: "2h 15min", quizzes: 15, difficulty: "Intermédiaire", rating: 4.7 },
      { id: 4, title: "Anonymat et Sécurité", duration: "1h 45min", quizzes: 10, difficulty: "Intermédiaire", rating: 4.9 },
      { id: 5, title: "Analyse Réseau", duration: "3h", quizzes: 20, difficulty: "Avancé", rating: 4.8 },
    ]
  },
  "redteaming": {
    title: "Red Teaming",
    icon: Zap,
    color: "secondary",
    description: "Simulation d'attaques avancées et techniques de pentest professionnel",
    modules: [
      { id: 1, title: "Introduction au Red Teaming", duration: "1h", quizzes: 10, difficulty: "Intermédiaire", rating: 4.8 },
      { id: 2, title: "Environnement d'Attaque", duration: "2h", quizzes: 15, difficulty: "Intermédiaire", rating: 4.7 },
      { id: 3, title: "Pentest Web Avancé", duration: "4h", quizzes: 25, difficulty: "Avancé", rating: 4.9 },
      { id: 4, title: "Attaques Réseau", duration: "3h 30min", quizzes: 22, difficulty: "Avancé", rating: 4.8 },
    ]
  },
  "blueteaming": {
    title: "Blue Teaming",
    icon: Brain,
    color: "accent",
    description: "Défense proactive, détection d'intrusions et réponse aux incidents",
    modules: [
      { id: 1, title: "Introduction au Blue Teaming", duration: "1h 15min", quizzes: 12, difficulty: "Débutant", rating: 4.7 },
      { id: 2, title: "Analyse des Menaces", duration: "2h 30min", quizzes: 18, difficulty: "Intermédiaire", rating: 4.8 },
      { id: 3, title: "Frameworks de Sécurité", duration: "2h", quizzes: 16, difficulty: "Intermédiaire", rating: 4.6 },
      { id: 4, title: "Configuration SIEM", duration: "3h 45min", quizzes: 24, difficulty: "Avancé", rating: 4.9 },
    ]
  }
};

export default function Modules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-primary/20 text-primary border-primary/30";
      case "Intermédiaire": return "bg-secondary/20 text-secondary border-secondary/30";
      case "Avancé": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "text-primary text-glow-primary border-primary glow-primary";
      case "secondary": return "text-secondary text-glow-secondary border-secondary glow-secondary";
      case "accent": return "text-accent text-glow-accent border-accent glow-accent";
      default: return "text-primary text-glow-primary border-primary glow-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-glow-primary">Modules de Formation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explorez nos modules de formation complets en cybersécurité, organisés par domaine d'expertise.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un module..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-xl border-border"
            />
          </div>
          <Button variant="outline" className="btn-glass">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/30 backdrop-blur-xl">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Tous
            </TabsTrigger>
            <TabsTrigger value="hacking-ethique" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Hacking Éthique
            </TabsTrigger>
            <TabsTrigger value="redteaming" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Red Teaming
            </TabsTrigger>
            <TabsTrigger value="blueteaming" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              Blue Teaming
            </TabsTrigger>
          </TabsList>

          {/* All Modules */}
          <TabsContent value="all" className="space-y-8">
            {Object.entries(moduleData).map(([key, category]) => (
              <div key={key} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <category.icon className={`h-8 w-8 ${getColorClasses(category.color)}`} />
                  <div>
                    <h2 className={`text-2xl font-bold ${getColorClasses(category.color)}`}>
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.modules.map((module) => (
                    <Card key={module.id} className="glass-card hover-glow group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1 text-accent">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{module.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {module.duration}
                          </span>
                          <span className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {module.quizzes} quiz
                          </span>
                        </div>
                        <Button className="w-full btn-matrix">
                          Commencer
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Individual Category Tabs */}
          {Object.entries(moduleData).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div className="text-center mb-8">
                <category.icon className={`h-16 w-16 mx-auto mb-4 ${getColorClasses(category.color)}`} />
                <h2 className={`text-3xl font-bold mb-2 ${getColorClasses(category.color)}`}>
                  {category.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.modules.map((module) => (
                  <Card key={module.id} className="glass-card hover-glow group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{module.rating}</span>
                        </div>
                      </div>
                      <CardTitle className={`text-lg group-hover:${category.color === 'primary' ? 'text-primary' : category.color === 'secondary' ? 'text-secondary' : 'text-accent'} transition-colors`}>
                        {module.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {module.duration}
                        </span>
                        <span className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {module.quizzes} quiz
                        </span>
                      </div>
                      <Button className={`w-full ${category.color === 'primary' ? 'btn-matrix' : category.color === 'secondary' ? 'btn-cyber' : 'btn-glass'}`}>
                        Commencer
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}