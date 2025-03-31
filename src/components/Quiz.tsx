import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Question } from '@/data/quizData';
import Confetti from './Confetti';
import { useAudio } from '@/contexts/AudioContext';
import { CheckCircle, XCircle, Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  const { playCorrect, playIncorrect, playSuccess, isMuted, toggleMute } = useAudio();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    
    const selectedOption = currentQuestion.options.find(option => option.id === optionId);
    
    if (selectedOption?.isCorrect) {
      setScore(prev => prev + 1);
      setShowConfetti(true);
      
      // Play correct sound with a slight delay to avoid sound cutoff
      setTimeout(() => {
        playCorrect();
      }, 50);
      
      toast({
        title: "Resposta Correta! 🎉",
        description: currentQuestion.explanation || "Muito bem!",
        variant: "default",
      });
    } else {
      // Play incorrect sound with a slight delay
      setTimeout(() => {
        playIncorrect();
      }, 50);
      
      const correctOption = currentQuestion.options.find(option => option.isCorrect);
      
      toast({
        title: "Resposta Incorreta",
        description: currentQuestion.explanation || `A resposta correta era: ${correctOption?.text}`,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    setShowConfetti(false);
    setSelectedOptionId(null);
    setIsAnswered(false);
    
    if (isLastQuestion) {
      setQuizCompleted(true);
      onComplete(score, questions.length);
      
      // Play success sound when quiz is completed with a slight delay
      setTimeout(() => {
        playSuccess();
      }, 100);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      setShowConfetti(true);
    }
  }, [quizCompleted]);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Confetti show={showConfetti} grandFinale={quizCompleted} />
      
      <div className="flex justify-between items-center mb-4">
        <Badge variant="outline" className="py-1 px-3">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </Badge>
        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <Card className="w-full mb-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map(option => (
            <Button
              key={option.id}
              variant={selectedOptionId === option.id 
                ? (option.isCorrect ? "default" : "destructive") 
                : (isAnswered && option.isCorrect ? "default" : "outline")}
              className={`w-full justify-start text-left p-6 h-auto text-base ${
                selectedOptionId === option.id ? 'ring-2 ring-offset-2' : ''
              } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => handleOptionSelect(option.id)}
              disabled={isAnswered && selectedOptionId !== option.id}
            >
              <span className="flex items-center gap-3">
                {isAnswered && option.isCorrect && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {isAnswered && selectedOptionId === option.id && !option.isCorrect && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                {option.text}
              </span>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            disabled={isAnswered && !isLastQuestion}
          >
            Voltar
          </Button>
          {isAnswered && (
            <Button onClick={handleNextQuestion} className="group">
              {isLastQuestion ? "Finalizar Quiz" : "Próxima Pergunta"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
