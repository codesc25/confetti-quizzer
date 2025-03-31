
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizCategory } from '@/data/quizData';
import { Pencil, ScrollText, Beaker, Globe, PlusCircle } from 'lucide-react';

interface QuizCardProps {
  category: QuizCategory;
  onSelect: (category: QuizCategory) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ category, onSelect }) => {
  const getIcon = () => {
    switch (category.icon) {
      case 'pencil':
        return <Pencil className="h-6 w-6" />;
      case 'scroll':
        return <ScrollText className="h-6 w-6" />;
      case 'flask':
        return <Beaker className="h-6 w-6" />;
      case 'globe':
        return <Globe className="h-6 w-6" />;
      default:
        return <PlusCircle className="h-6 w-6" />;
    }
  };
  
  const getBgColor = () => {
    switch (category.id) {
      case 'science':
        return 'bg-quiz-blue';
      case 'history':
        return 'bg-quiz-orange';
      case 'geography':
        return 'bg-quiz-purple';
      case 'custom':
        return 'bg-quiz-pink';
      default:
        return 'bg-primary';
    }
  };

  const isCustomCategory = category.id === 'custom';

  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 rounded-full ${getBgColor()} text-white flex items-center justify-center mb-3`}>
          {getIcon()}
        </div>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isCustomCategory && (
          <p className="text-sm text-muted-foreground">
            {category.questions.length} perguntas disponíveis
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onSelect(category)}
          variant={isCustomCategory ? "outline" : "default"}
        >
          {isCustomCategory ? "Criar Quiz" : "Iniciar Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
