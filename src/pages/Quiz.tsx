import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Award, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Quiz = Tables<'quiz'>;
type Module = Tables<'modules'>;

export default function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [module, setModule] = useState<Module | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answer: number; isCorrect: boolean }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleId || !user) return;

    const fetchModuleAndQuiz = async () => {
      try {
        // Fetch module details
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', moduleId)
          .single();

        if (moduleError) throw moduleError;
        setModule(moduleData);

        // Fetch quiz questions for this module
        const { data: quizData, error: quizError } = await supabase
          .from('quiz')
          .select('*')
          .eq('module_id', moduleId)
          .order('order_index');

        if (quizError) throw quizError;
        setQuizzes(quizData || []);

      } catch (error) {
        console.error('Error fetching quiz:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le quiz.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModuleAndQuiz();
  }, [moduleId, user]);

  const currentQuestion = quizzes[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer === null || !currentQuestion || !user) return;

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    // Record the answer
    try {
      await supabase
        .from('user_quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: currentQuestion.id,
          selected_answer: selectedAnswer,
          is_correct: isCorrect,
          points_earned: isCorrect ? (currentQuestion.points || 10) : 0
        });
    } catch (error) {
      console.error('Error recording quiz attempt:', error);
    }

    // Store answer locally
    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      isCorrect
    }]);

    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentQuestionIndex < quizzes.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = async () => {
    if (!user || !moduleId) return;

    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = quizzes.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalPoints = userAnswers.reduce((sum, answer) => 
      sum + (answer.isCorrect ? 10 : 0), 0
    );

    try {
      // Update user progress
      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          status: 'completed',
          progress_percentage: 100,
          quiz_score: totalPoints,
          quiz_attempts: 1,
          completed_at: new Date().toISOString()
        });

      setQuizCompleted(true);
      
      toast({
        title: "Quiz terminé !",
        description: `Vous avez obtenu ${score}% (${correctAnswers}/${totalQuestions} bonnes réponses)`
      });

    } catch (error) {
      console.error('Error completing quiz:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre score.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card className="glass-card max-w-md w-full mx-4">
          <CardContent className="text-center py-8">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Aucun quiz disponible</h2>
            <p className="text-muted-foreground mb-4">
              Ce module n'a pas encore de quiz associé.
            </p>
            <Button onClick={() => navigate('/modules')} className="btn-matrix">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux modules
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / quizzes.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card className="glass-card max-w-lg w-full mx-4">
          <CardContent className="text-center py-8">
            <Award className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
            <p className="text-lg mb-4">
              Module: <span className="text-primary">{module?.title}</span>
            </p>
            <div className="bg-card/50 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-accent mb-2">{score}%</div>
              <div className="text-muted-foreground">
                {correctAnswers} bonnes réponses sur {quizzes.length}
              </div>
            </div>
            <div className="space-y-2">
              <Button onClick={() => navigate('/modules')} className="btn-matrix w-full">
                Retour aux modules
              </Button>
              <Button 
                onClick={() => navigate('/progress')} 
                variant="outline" 
                className="btn-glass w-full"
              >
                Voir mes progrès
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/modules')} 
            variant="outline" 
            className="btn-glass mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-glow-primary">{module?.title}</h1>
              <p className="text-muted-foreground">Quiz de validation</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Question {currentQuestionIndex + 1} / {quizzes.length}
            </Badge>
          </div>

          <Progress 
            value={((currentQuestionIndex + 1) / quizzes.length) * 100} 
            className="h-2 mb-6"
          />
        </div>

        {/* Question Card */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(currentQuestion?.options as string[])?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestion.correct_answer
                          ? 'bg-green-500/20 border-green-500 text-green-200'
                          : 'bg-red-500/20 border-red-500 text-red-200'
                        : 'bg-primary/20 border-primary text-primary'
                      : showResult && index === currentQuestion.correct_answer
                        ? 'bg-green-500/20 border-green-500 text-green-200'
                        : 'bg-card/50 border-border hover:bg-card/80'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-sm font-medium mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showResult && selectedAnswer === index && (
                      <span className="ml-auto">
                        {index === currentQuestion.correct_answer ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && currentQuestion?.explanation && (
              <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border">
                <h4 className="font-medium mb-2 text-accent">Explication :</h4>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}

            {!showResult && (
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="btn-matrix w-full mt-6"
              >
                {currentQuestionIndex < quizzes.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}