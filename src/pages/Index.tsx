
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { quizCategories, QuizCategory, Question } from "@/data/quizData";
import QuizCard from "@/components/QuizCard";
import Quiz from "@/components/Quiz";
import QuizResults from "@/components/QuizResults";
import QuizCreator from "@/components/QuizCreator";
import { useToast } from "@/components/ui/use-toast";
import { AudioProvider } from "@/contexts/AudioContext";
import { Download, Upload } from 'lucide-react';

// Create a public directory with the sound files
const soundFiles = [
  { filename: '/correct.mp3', url: 'https://freesound.org/data/previews/476/476178_7307322-lq.mp3' },
  { filename: '/incorrect.mp3', url: 'https://freesound.org/data/previews/476/476177_7307322-lq.mp3' },
  { filename: '/success.mp3', url: 'https://freesound.org/data/previews/320/320652_5260872-lq.mp3' },
];

type AppState = 'home' | 'quiz' | 'creator' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  const handleCategorySelect = (category: QuizCategory) => {
    setSelectedCategory(category);
    if (category.id === 'custom') {
      setAppState('creator');
    } else {
      setAppState('quiz');
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizScore({ score, total: totalQuestions });
    setAppState('results');
  };

  const handleRestartQuiz = () => {
    setAppState('quiz');
  };

  const handleNewQuiz = () => {
    setSelectedCategory(null);
    setQuizScore(null);
    setAppState('home');
  };

  const handleSaveCustomQuiz = (questions: Question[]) => {
    setCustomQuestions(questions);
    // Clone the custom category and add the questions
    const customCategory = { 
      ...quizCategories.find(cat => cat.id === 'custom')!,
      questions: questions
    };
    setSelectedCategory(customCategory);
    setAppState('quiz');
  };

  const exportQuiz = () => {
    if (!selectedCategory || !selectedCategory.questions.length) {
      toast({
        title: "Nenhum quiz para exportar",
        description: "Selecione ou crie um quiz primeiro.",
        variant: "destructive",
      });
      return;
    }

    const quizData = {
      name: selectedCategory.name,
      questions: selectedCategory.questions
    };

    const blob = new Blob([JSON.stringify(quizData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCategory.name.toLowerCase().replace(/\s+/g, '-')}-quiz.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Quiz exportado com sucesso!",
      description: "O arquivo JSON do quiz foi baixado.",
    });
  };

  const importQuiz = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const quizData = JSON.parse(event.target?.result as string);
          
          if (!quizData.questions || !Array.isArray(quizData.questions)) {
            throw new Error("Formato de quiz inválido.");
          }
          
          setCustomQuestions(quizData.questions);
          
          // Create a custom category with the imported questions
          const importedCategory = {
            id: `imported_${Date.now()}`,
            name: quizData.name || "Quiz Importado",
            icon: "pencil",
            description: "Quiz importado de arquivo",
            questions: quizData.questions
          };
          
          setSelectedCategory(importedCategory);
          setAppState('quiz');
          
          toast({
            title: "Quiz importado com sucesso!",
            description: `${quizData.questions.length} perguntas carregadas.`,
          });
        } catch (error) {
          toast({
            title: "Erro ao importar quiz",
            description: "O arquivo selecionado não é um quiz válido.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  const renderContent = () => {
    switch (appState) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Confetti Quizzer</h1>
              <p className="text-xl text-muted-foreground">
                Crie e jogue quizzes divertidos com animações e sons
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {quizCategories.map((category) => (
                <QuizCard key={category.id} category={category} onSelect={handleCategorySelect} />
              ))}
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" onClick={importQuiz} className="gap-2">
                <Upload className="h-4 w-4" /> Importar Quiz
              </Button>
              <Button variant="outline" onClick={exportQuiz} disabled={!selectedCategory} className="gap-2">
                <Download className="h-4 w-4" /> Exportar Quiz
              </Button>
            </div>
          </div>
        );
      
      case 'quiz':
        return selectedCategory && (
          <Quiz 
            questions={selectedCategory.questions} 
            onComplete={handleQuizComplete} 
            onBack={handleNewQuiz}
          />
        );
      
      case 'creator':
        return (
          <QuizCreator 
            onSave={handleSaveCustomQuiz} 
            onCancel={handleNewQuiz}
          />
        );
      
      case 'results':
        return quizScore && (
          <QuizResults 
            score={quizScore.score} 
            totalQuestions={quizScore.total} 
            onRestart={handleRestartQuiz} 
            onNewQuiz={handleNewQuiz}
          />
        );
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto">
          {renderContent()}
        </div>
      </div>
    </AudioProvider>
  );
};

export default Index;
