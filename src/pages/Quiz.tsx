import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Trophy, Clock, Star, Play, RotateCcw, CheckCircle } from "lucide-react";

const quizData = [
  {
    id: 1,
    title: "Bases du Hacking Éthique",
    category: "Hacking Éthique",
    categoryColor: "primary",
    questions: 15,
    duration: "20 min",
    difficulty: "Débutant",
    score: 87,
    completed: true,
    rating: 4.8
  },
  {
    id: 2,
    title: "Configuration Lab de Pentest",
    category: "Hacking Éthique", 
    categoryColor: "primary",
    questions: 12,
    duration: "15 min",
    difficulty: "Débutant",
    score: 92,
    completed: true,
    rating: 4.7
  },
  {
    id: 3,
    title: "Techniques Red Team Avancées",
    category: "Red Teaming",
    categoryColor: "secondary",
    questions: 25,
    duration: "35 min",
    difficulty: "Avancé",
    score: null,
    completed: false,
    rating: 4.9
  },
  {
    id: 4,
    title: "SIEM et Détection d'Intrusions",
    category: "Blue Teaming",
    categoryColor: "accent",
    questions: 18,
    duration: "25 min",
    difficulty: "Intermédiaire",
    score: 78,
    completed: true,
    rating: 4.6
  },
  {
    id: 5,
    title: "Phishing et Social Engineering",
    category: "Red Teaming",
    categoryColor: "secondary",
    questions: 20,
    duration: "30 min",
    difficulty: "Intermédiaire",
    score: null,
    completed: false,
    rating: 4.8
  },
  {
    id: 6,
    title: "Réponse aux Incidents",
    category: "Blue Teaming",
    categoryColor: "accent",
    questions: 22,
    duration: "30 min",
    difficulty: "Avancé",
    score: null,
    completed: false,
    rating: 4.7
  }
];

const stats = {
  totalQuizzes: 47,
  completedQuizzes: 28,
  averageScore: 84,
  totalTime: "12h 30min",
  badges: 8,
  streak: 7
};

export default function Quiz() {
  const [selectedTab, setSelectedTab] = useState("available");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-primary/20 text-primary border-primary/30";
      case "Intermédiaire": return "bg-secondary/20 text-secondary border-secondary/30";
      case "Avancé": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case "primary": return "text-primary border-primary";
      case "secondary": return "text-secondary border-secondary";
      case "accent": return "text-accent border-accent";
      default: return "text-primary border-primary";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-primary text-glow-primary";
    if (score >= 75) return "text-secondary text-glow-secondary";
    return "text-accent text-glow-accent";
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-glow-primary">Quiz Interactifs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Testez vos connaissances avec nos quiz interactifs et suivez votre progression en temps réel.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary text-glow-primary">{stats.totalQuizzes}</div>
              <div className="text-xs text-muted-foreground">Quiz Total</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary text-glow-secondary">{stats.completedQuizzes}</div>
              <div className="text-xs text-muted-foreground">Terminés</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent text-glow-accent">{stats.averageScore}%</div>
              <div className="text-xs text-muted-foreground">Score Moyen</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary text-glow-primary">{stats.totalTime}</div>
              <div className="text-xs text-muted-foreground">Temps Total</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary text-glow-secondary">{stats.badges}</div>
              <div className="text-xs text-muted-foreground">Badges</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent text-glow-accent">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Jours de Suite</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Progression Globale</span>
              <span className="text-primary text-glow-primary">{Math.round((stats.completedQuizzes / stats.totalQuizzes) * 100)}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(stats.completedQuizzes / stats.totalQuizzes) * 100} 
              className="h-3 bg-muted"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{stats.completedQuizzes} quiz terminés</span>
              <span>{stats.totalQuizzes - stats.completedQuizzes} restants</span>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/30 backdrop-blur-xl">
            <TabsTrigger value="available" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Quiz Disponibles
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Terminés
            </TabsTrigger>
            <TabsTrigger value="recommended" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              Recommandés
            </TabsTrigger>
          </TabsList>

          {/* Available Quizzes */}
          <TabsContent value="available">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizData.filter(quiz => !quiz.completed).map((quiz) => (
                <Card key={quiz.id} className="glass-card hover-glow group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getCategoryColor(quiz.categoryColor)} bg-transparent`}>
                        {quiz.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{quiz.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {quiz.duration}
                      </span>
                    </div>
                    <Button className="w-full btn-matrix">
                      <Play className="h-4 w-4 mr-2" />
                      Commencer le Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Quizzes */}
          <TabsContent value="completed">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizData.filter(quiz => quiz.completed).map((quiz) => (
                <Card key={quiz.id} className="glass-card hover-glow group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getCategoryColor(quiz.categoryColor)} bg-transparent`}>
                        {quiz.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className={`text-lg font-bold ${getScoreColor(quiz.score!)}`}>
                          {quiz.score}%
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {quiz.duration}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 btn-glass">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Refaire
                      </Button>
                      <Button variant="outline" className="btn-glass">
                        Résultats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recommended Quizzes */}
          <TabsContent value="recommended">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizData.slice(0, 3).map((quiz) => (
                <Card key={quiz.id} className="glass-card hover-glow group border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Recommandé
                      </Badge>
                      <div className="flex items-center space-x-1 text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{quiz.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {quiz.duration}
                      </span>
                    </div>
                    <Button className="w-full btn-matrix">
                      <Play className="h-4 w-4 mr-2" />
                      Commencer le Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}