
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, PlusCircle, Save } from 'lucide-react';
import { Question } from '@/data/quizData';

interface QuizCreatorProps {
  onSave: (questions: Question[]) => void;
  onCancel: () => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ onSave, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([{
    id: `custom_${Date.now()}`,
    text: '',
    options: [
      { id: `opt_${Date.now()}_1`, text: '', isCorrect: true },
      { id: `opt_${Date.now()}_2`, text: '', isCorrect: false },
      { id: `opt_${Date.now()}_3`, text: '', isCorrect: false },
      { id: `opt_${Date.now()}_4`, text: '', isCorrect: false },
    ],
    explanation: ''
  }]);
  const { toast } = useToast();

  const handleQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    // Reset all options to incorrect
    updatedQuestions[questionIndex].options.forEach(option => option.isCorrect = false);
    // Set the selected option as correct
    updatedQuestions[questionIndex].options[optionIndex].isCorrect = true;
    setQuestions(updatedQuestions);
  };

  const handleExplanationChange = (index: number, explanation: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].explanation = explanation;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      id: `custom_${Date.now()}`,
      text: '',
      options: [
        { id: `opt_${Date.now()}_1`, text: '', isCorrect: true },
        { id: `opt_${Date.now()}_2`, text: '', isCorrect: false },
        { id: `opt_${Date.now()}_3`, text: '', isCorrect: false },
        { id: `opt_${Date.now()}_4`, text: '', isCorrect: false },
      ],
      explanation: ''
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      toast({
        title: "Atenção",
        description: "Você precisa ter pelo menos uma pergunta no seu quiz.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    // Validate all questions and options
    const hasEmptyFields = questions.some(
      q => !q.text.trim() || q.options.some(o => !o.text.trim())
    );
    
    if (hasEmptyFields) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todas as perguntas e opções de resposta.",
        variant: "destructive",
      });
      return;
    }
    
    onSave(questions);
    toast({
      title: "Quiz criado com sucesso!",
      description: `Seu quiz com ${questions.length} perguntas está pronto para ser jogado.`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar Quiz Personalizado</h2>
      
      {questions.map((question, qIndex) => (
        <Card key={question.id} className="mb-8 shadow-md">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-xl">Pergunta {qIndex + 1}</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeQuestion(qIndex)} 
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`question-${qIndex}`}>Texto da pergunta</Label>
              <Textarea 
                id={`question-${qIndex}`}
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Digite sua pergunta aqui..."
                className="resize-none"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Opções de resposta</Label>
              {question.options.map((option, oIndex) => (
                <div key={option.id} className="flex items-center gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    placeholder={`Opção ${oIndex + 1}`}
                    className="flex-1"
                  />
                  <Label className="cursor-pointer flex items-center gap-2">
                    <input 
                      type="radio" 
                      name={`correct-${question.id}`} 
                      checked={option.isCorrect} 
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)} 
                    />
                    Correta
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`explanation-${qIndex}`}>Explicação (opcional)</Label>
              <Textarea 
                id={`explanation-${qIndex}`}
                value={question.explanation || ''}
                onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                placeholder="Explique por que esta é a resposta correta..."
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center mb-8">
        <Button 
          variant="outline" 
          onClick={addQuestion} 
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Adicionar Pergunta
        </Button>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Salvar Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCreator;
