import { HeroSection } from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Trophy, Clock, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <HeroSection />
      
      {/* Quick Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-glow-primary">
            Votre Progression
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Modules Terminés</CardTitle>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary text-glow-primary">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 depuis la semaine dernière
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Réussis</CardTitle>
                <Target className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary text-glow-secondary">47</div>
                <p className="text-xs text-muted-foreground">
                  Score moyen: 87%
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Badges Obtenus</CardTitle>
                <Trophy className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent text-glow-accent">8</div>
                <p className="text-xs text-muted-foreground">
                  3 badges d'expert
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Temps d'Étude</CardTitle>
                <Clock className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary text-glow-primary">34h</div>
                <p className="text-xs text-muted-foreground">
                  Ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Modules Section */}
      <section className="py-16 px-6 bg-card/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-glow-secondary">Modules Recommandés</h2>
            <Button variant="outline" className="btn-glass">
              Voir Tous les Modules
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module Cards */}
            <Card className="glass-card hover-glow group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Hacking Éthique
                  </Badge>
                  <div className="flex items-center space-x-1 text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  Reconnaissance & OSINT
                </CardTitle>
                <CardDescription>
                  Apprenez les techniques de collecte d'informations et de reconnaissance passive pour vos tests d'intrusion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    2h 30min
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    12 quiz
                  </span>
                </div>
                <Button className="w-full btn-matrix">
                  Commencer le Module
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    Red Teaming
                  </Badge>
                  <div className="flex items-center space-x-1 text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                  Phishing Avancé
                </CardTitle>
                <CardDescription>
                  Techniques d'ingénierie sociale et de phishing pour les tests d'intrusion en environnement réel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    3h 15min
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    18 quiz
                  </span>
                </div>
                <Button className="w-full btn-cyber">
                  Commencer le Module
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Blue Teaming
                  </Badge>
                  <div className="flex items-center space-x-1 text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">
                  Détection SIEM
                </CardTitle>
                <CardDescription>
                  Configuration et optimisation des règles SIEM pour la détection d'intrusions et l'analyse forensique.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    2h 45min
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    15 quiz
                  </span>
                </div>
                <Button variant="outline" className="w-full btn-glass">
                  Commencer le Module
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-glow-accent">
            Votre Parcours d'Apprentissage
          </h2>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Progression Globale</span>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Niveau Intermédiaire
                </Badge>
              </CardTitle>
              <CardDescription>
                Vous avez parcouru 34% du contenu total disponible sur MatrixSec
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary">Hacking Éthique</span>
                    <span className="text-muted-foreground">8/14 modules</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full glow-primary" 
                      style={{ width: '57%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary">Red Teaming</span>
                    <span className="text-muted-foreground">3/9 modules</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-secondary h-2 rounded-full glow-secondary" 
                      style={{ width: '33%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-accent">Blue Teaming</span>
                    <span className="text-muted-foreground">1/8 modules</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-accent h-2 rounded-full glow-accent" 
                      style={{ width: '12%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button className="btn-matrix">
                  Continuer l'Apprentissage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}