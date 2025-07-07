import { Shield, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/matrix-hero.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/90" />
      </div>

      {/* Matrix Effect Overlay */}
      <div className="absolute inset-0 matrix-bg opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center animate-fade-in-up">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-glow-primary">Matrix</span>
            <span className="text-glow-accent">Sec</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La référence éducative francophone en 
            <span className="text-primary font-semibold"> cybersécurité offensive</span> et 
            <span className="text-accent font-semibold"> défensive</span>
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 hover-glow group">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-primary-glow transition-colors" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Hacking Éthique</h3>
            <p className="text-sm text-muted-foreground">
              Apprentissage des techniques offensives pour mieux comprendre les vulnérabilités
            </p>
          </div>

          <div className="glass-card p-6 hover-glow group">
            <Zap className="h-12 w-12 text-secondary mx-auto mb-4 group-hover:text-secondary-glow transition-colors" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Red Teaming</h3>
            <p className="text-sm text-muted-foreground">
              Simulation d'attaques avancées et techniques de pentest professionnel
            </p>
          </div>

          <div className="glass-card p-6 hover-glow group">
            <Brain className="h-12 w-12 text-accent mx-auto mb-4 group-hover:text-accent-glow transition-colors" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Blue Teaming</h3>
            <p className="text-sm text-muted-foreground">
              Défense proactive, détection d'intrusions et réponse aux incidents
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-matrix h-12 px-8 text-lg">
            Commencer l'Apprentissage
          </Button>
          <Button variant="outline" className="btn-glass h-12 px-8 text-lg">
            Explorer les Modules
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary text-glow-primary">35+</div>
            <div className="text-sm text-muted-foreground">Modules de Formation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary text-glow-secondary">500+</div>
            <div className="text-sm text-muted-foreground">Questions Quiz</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent text-glow-accent">3</div>
            <div className="text-sm text-muted-foreground">Domaines d'Expertise</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary text-glow-primary">100%</div>
            <div className="text-sm text-muted-foreground">Gratuit & Open Source</div>
          </div>
        </div>
      </div>
    </section>
  );
}