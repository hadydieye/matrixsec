import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Filter, Star, ShieldCheck, Target, Eye, Search, Loader2, Shield, Zap, Brain } from "lucide-react";
import { useModules } from "@/hooks/useModules";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/hooks/use-toast";

// Category mapping for better organization
const categoryInfo = {
  "basics": {
    title: "Hacking Éthique",
    icon: Shield,
    color: "primary",
    description: "Apprentissage des techniques offensives pour mieux comprendre les vulnérabilités"
  },
  "network": {
    title: "Red Teaming", 
    icon: Zap,
    color: "secondary",
    description: "Simulation d'attaques avancées et techniques de pentest professionnel"
  },
  "web": {
    title: "Blue Teaming",
    icon: Brain,
    color: "accent", 
    description: "Défense proactive, détection d'intrusions et réponse aux incidents"
  },
  "forensics": {
    title: "Blue Teaming",
    icon: Brain,
    color: "accent",
    description: "Défense proactive, détection d'intrusions et réponse aux incidents"
  },
  "social_engineering": {
    title: "Red Teaming",
    icon: Zap,
    color: "secondary",
    description: "Simulation d'attaques avancées et techniques de pentest professionnel"
  },
  "cryptography": {
    title: "Hacking Éthique",
    icon: Shield,
    color: "primary",
    description: "Apprentissage des techniques offensives pour mieux comprendre les vulnérabilités"
  },
  "mobile": {
    title: "Hacking Éthique",
    icon: Shield,
    color: "primary",
    description: "Apprentissage des techniques offensives pour mieux comprendre les vulnérabilités"
  }
};

function Modules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  
  const { modules, loading, error } = useModules();
  const { getModuleProgress, startModule } = useUserProgress();
  const { toast } = useToast();

  // Group modules by category
  const modulesByCategory = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    
    modules.forEach(module => {
      const category = module.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(module);
    });
    
    return grouped;
  }, [modules]);

  // Filter modules based on search and category
  const filteredModules = useMemo(() => {
    let filtered = modules;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(module => module.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [modules, selectedCategory, searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-primary/20 text-primary border-primary/30";
      case "intermediate":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "advanced":
        return "bg-accent/20 text-accent border-accent/30";
      case "expert":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary text-glow-primary border-primary glow-primary";
      case "secondary":
        return "text-secondary text-glow-secondary border-secondary glow-secondary";
      case "accent":
        return "text-accent text-glow-accent border-accent glow-accent";
      default:
        return "text-primary text-glow-primary border-primary glow-primary";
    }
  };

  const handleStartModule = async (moduleId: string) => {
    try {
      await startModule(moduleId);
      toast({
        title: "Module démarré",
        description: "Votre progression a été enregistrée."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le module.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Erreur</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow-primary">Modules de Formation</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
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
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 bg-card/30 backdrop-blur-xl">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs md:text-sm">
              Tous
            </TabsTrigger>
            <TabsTrigger value="basics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs md:text-sm">
              Basics
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary text-xs md:text-sm">
              Network
            </TabsTrigger>
            <TabsTrigger value="web" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent text-xs md:text-sm">
              Web
            </TabsTrigger>
          </TabsList>

          {/* All Modules */}
          <TabsContent value="all" className="space-y-8">
            {Object.entries(modulesByCategory).map(([categoryKey, categoryModules]) => {
              const categoryConfig = categoryInfo[categoryKey as keyof typeof categoryInfo] || categoryInfo.basics;
              
              return (
                <div key={categoryKey} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <categoryConfig.icon className={`h-8 w-8 ${getColorClasses(categoryConfig.color)}`} />
                    <div>
                      <h2 className={`text-2xl font-bold ${getColorClasses(categoryConfig.color)}`}>
                        {categoryConfig.title}
                      </h2>
                      <p className="text-muted-foreground">{categoryConfig.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categoryModules
                      .filter(module =>
                        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (module.description && module.description.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map((module) => {
                        const progress = getModuleProgress(module.id);
                        const isStarted = progress?.status !== undefined && progress?.status !== 'not_started';
                        
                        return (
                         <Card key={module.id} className="relative overflow-hidden bg-gradient-to-br from-card/40 via-card/20 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-500 group backdrop-blur-xl">
                            {/* Animated background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                            
                            <CardHeader className="relative z-10">
                              <div className="flex items-center justify-between mb-3">
                                <Badge className={`${getDifficultyColor(module.difficulty)} backdrop-blur-sm border font-semibold`}>
                                  {module.difficulty.toUpperCase()}
                                </Badge>
                                {isStarted && (
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-300/30 backdrop-blur-sm font-semibold">
                                    {progress?.status === 'completed' ? '✓ TERMINÉ' : '⚡ EN COURS'}
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">
                                {module.title}
                              </CardTitle>
                              {module.description && (
                                <CardDescription className="text-sm text-muted-foreground/80 leading-relaxed">
                                  {module.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="relative z-10">
                              <div className="flex items-center justify-between text-sm mb-4">
                                <div className="flex items-center text-primary/70">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span className="font-medium">{module.estimated_duration_minutes} min</span>
                                </div>
                                {progress?.progress_percentage !== undefined && (
                                  <div className="text-accent font-semibold">
                                    {progress.progress_percentage}% complété
                                  </div>
                                )}
                              </div>
                              
                              {/* Progress bar if module started */}
                              {progress?.progress_percentage !== undefined && (
                                <div className="mb-4">
                                  <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                                    <div 
                                      className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-700 rounded-full"
                                      style={{ width: `${progress.progress_percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                              
                              <Button 
                                className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/60 text-primary hover:text-white transition-all duration-300 backdrop-blur-sm font-semibold"
                                onClick={() => navigate(`/quiz/${module.id}`)}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10">
                                  {isStarted ? '🚀 CONTINUER LE QUIZ' : '⚡ COMMENCER'}
                                </span>
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* Individual Category Tabs */}
          {Object.entries(modulesByCategory).map(([categoryKey, categoryModules]) => {
            const categoryConfig = categoryInfo[categoryKey as keyof typeof categoryInfo] || categoryInfo.basics;
            
            return (
              <TabsContent key={categoryKey} value={categoryKey} className="space-y-6">
                <div className="text-center mb-8">
                  <categoryConfig.icon className={`h-16 w-16 mx-auto mb-4 ${getColorClasses(categoryConfig.color)}`} />
                  <h2 className={`text-3xl font-bold mb-2 ${getColorClasses(categoryConfig.color)}`}>
                    {categoryConfig.title}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {categoryConfig.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {categoryModules
                    .filter(module =>
                      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (module.description && module.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((module) => {
                      const progress = getModuleProgress(module.id);
                      const isStarted = progress?.status !== undefined && progress?.status !== 'not_started';
                      
                      return (
                        <Card key={module.id} className="glass-card hover-glow group">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={getDifficultyColor(module.difficulty)}>
                                {module.difficulty}
                              </Badge>
                              {isStarted && (
                                <Badge variant="outline" className="bg-blue-50/10 text-blue-300 border-blue-300/30">
                                  {progress?.status === 'completed' ? 'Terminé' : 'En cours'}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className={`text-lg group-hover:text-primary transition-colors`}>
                              {module.title}
                            </CardTitle>
                            {module.description && (
                              <CardDescription className="text-sm text-muted-foreground">
                                {module.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {module.estimated_duration_minutes}min
                              </span>
                              {progress?.progress_percentage !== undefined && (
                                <span>
                                  {progress.progress_percentage}% complété
                                </span>
                              )}
                            </div>
                            <Button 
                              className={`w-full ${categoryConfig.color === 'primary' ? 'btn-matrix' : categoryConfig.color === 'secondary' ? 'btn-cyber' : 'btn-glass'}`}
                              onClick={() => handleStartModule(module.id)}
                            >
                              {isStarted ? 'Continuer' : 'Commencer'}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </TabsContent>
            );
          })}
          
          {filteredModules.length === 0 && (
            <TabsContent value={selectedCategory} className="text-center py-12">
              <p className="text-muted-foreground">Aucun module trouvé pour votre recherche.</p>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Modules;