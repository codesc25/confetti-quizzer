
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Confetti from './Confetti';
import { Award } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onNewQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onNewQuiz 
}) => {
  const [showConfetti, setShowConfetti] = React.useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    // Show confetti on component mount
    setShowConfetti(true);
    
    // Cleanup
    return () => setShowConfetti(false);
  }, []);
  
  const getMessage = () => {
    if (percentage === 100) return "Perfeito! Você acertou todas as perguntas!";
    if (percentage >= 80) return "Excelente! Você tem um ótimo conhecimento!";
    if (percentage >= 60) return "Muito bom! Você está no caminho certo!";
    if (percentage >= 40) return "Bom trabalho! Continue praticando!";
    return "Continue tentando! A prática leva à perfeição!";
  };
  
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Confetti show={showConfetti} grandFinale={percentage === 100} />
      
      <Card className="w-full shadow-lg border-2 border-primary/20 animate-scale">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex flex-col items-center gap-4">
            {percentage === 100 && (
              <div className="text-yellow-500 animate-float">
                <Award className="h-16 w-16" />
              </div>
            )}
            Resultado do Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary mb-2">{score}/{totalQuestions}</p>
            <p className="text-lg text-muted-foreground">{getMessage()}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Desempenho</span>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-center">
              {percentage < 70 
                ? "Que tal tentar novamente para melhorar sua pontuação?" 
                : "Parabéns pelo seu desempenho! Que tal experimentar outro quiz?"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onRestart}>
            Refazer o Quiz
          </Button>
          <Button onClick={onNewQuiz}>
            Novo Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResults;
