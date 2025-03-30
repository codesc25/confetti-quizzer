
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

// Sample predefined quiz categories and questions
export const quizCategories: QuizCategory[] = [
  {
    id: "science",
    name: "Ciência",
    icon: "flask",
    description: "Perguntas sobre ciências naturais, física, química e biologia",
    questions: [
      {
        id: "sci1",
        text: "Qual é o símbolo químico do ouro?",
        options: [
          { id: "sci1_a", text: "Au", isCorrect: true },
          { id: "sci1_b", text: "Ag", isCorrect: false },
          { id: "sci1_c", text: "Fe", isCorrect: false },
          { id: "sci1_d", text: "Or", isCorrect: false },
        ],
        explanation: "O símbolo químico do ouro é Au, derivado do seu nome em latim 'Aurum'."
      },
      {
        id: "sci2",
        text: "Qual dos seguintes não é um planeta do sistema solar?",
        options: [
          { id: "sci2_a", text: "Vênus", isCorrect: false },
          { id: "sci2_b", text: "Júpiter", isCorrect: false },
          { id: "sci2_c", text: "Plutão", isCorrect: true },
          { id: "sci2_d", text: "Marte", isCorrect: false },
        ],
        explanation: "Plutão foi reclassificado como um planeta anão em 2006 pela União Astronômica Internacional."
      },
      {
        id: "sci3",
        text: "Qual é a fórmula química da água?",
        options: [
          { id: "sci3_a", text: "H2O", isCorrect: true },
          { id: "sci3_b", text: "CO2", isCorrect: false },
          { id: "sci3_c", text: "O2", isCorrect: false },
          { id: "sci3_d", text: "H2O2", isCorrect: false },
        ],
        explanation: "A água é formada por duas moléculas de hidrogênio e uma de oxigênio, resultando na fórmula H2O."
      },
      {
        id: "sci4",
        text: "Qual é o maior órgão do corpo humano?",
        options: [
          { id: "sci4_a", text: "Coração", isCorrect: false },
          { id: "sci4_b", text: "Cérebro", isCorrect: false },
          { id: "sci4_c", text: "Pele", isCorrect: true },
          { id: "sci4_d", text: "Fígado", isCorrect: false },
        ],
        explanation: "A pele é o maior órgão do corpo humano, cobrindo uma área de aproximadamente 2 metros quadrados em um adulto médio."
      },
      {
        id: "sci5",
        text: "Qual é a velocidade aproximada da luz no vácuo?",
        options: [
          { id: "sci5_a", text: "300.000 km/s", isCorrect: true },
          { id: "sci5_b", text: "150.000 km/s", isCorrect: false },
          { id: "sci5_c", text: "1.000.000 km/s", isCorrect: false },
          { id: "sci5_d", text: "100.000 km/s", isCorrect: false },
        ],
        explanation: "A velocidade da luz no vácuo é aproximadamente 299.792 km/s, geralmente arredondada para 300.000 km/s."
      }
    ]
  },
  {
    id: "history",
    name: "História",
    icon: "scroll",
    description: "Perguntas sobre eventos históricos, civilizações e personagens importantes",
    questions: [
      {
        id: "hist1",
        text: "Em que ano o Brasil foi descoberto oficialmente pelos portugueses?",
        options: [
          { id: "hist1_a", text: "1500", isCorrect: true },
          { id: "hist1_b", text: "1492", isCorrect: false },
          { id: "hist1_c", text: "1549", isCorrect: false },
          { id: "hist1_d", text: "1650", isCorrect: false },
        ],
        explanation: "O Brasil foi oficialmente descoberto pelos portugueses em 22 de abril de 1500, quando a frota de Pedro Álvares Cabral chegou ao atual Porto Seguro, na Bahia."
      },
      {
        id: "hist2",
        text: "Quem foi o primeiro presidente do Brasil?",
        options: [
          { id: "hist2_a", text: "Dom Pedro I", isCorrect: false },
          { id: "hist2_b", text: "Dom Pedro II", isCorrect: false },
          { id: "hist2_c", text: "Marechal Deodoro da Fonseca", isCorrect: true },
          { id: "hist2_d", text: "Getúlio Vargas", isCorrect: false },
        ],
        explanation: "Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil, governando de 1889 a 1891, após a Proclamação da República."
      },
      {
        id: "hist3",
        text: "Qual desses eventos ocorreu primeiro?",
        options: [
          { id: "hist3_a", text: "Segunda Guerra Mundial", isCorrect: false },
          { id: "hist3_b", text: "Revolução Francesa", isCorrect: true },
          { id: "hist3_c", text: "Revolução Russa", isCorrect: false },
          { id: "hist3_d", text: "Independência dos EUA", isCorrect: false },
        ],
        explanation: "A Revolução Francesa ocorreu entre 1789 e 1799, antes da Revolução Russa (1917) e da Segunda Guerra Mundial (1939-1945)."
      },
      {
        id: "hist4",
        text: "Quem foi o líder sul-africano que lutou contra o apartheid e se tornou presidente?",
        options: [
          { id: "hist4_a", text: "Kofi Annan", isCorrect: false },
          { id: "hist4_b", text: "Nelson Mandela", isCorrect: true },
          { id: "hist4_c", text: "Desmond Tutu", isCorrect: false },
          { id: "hist4_d", text: "Robert Mugabe", isCorrect: false },
        ],
        explanation: "Nelson Mandela liderou a luta contra o regime de segregação racial na África do Sul e se tornou o primeiro presidente negro do país em 1994."
      },
      {
        id: "hist5",
        text: "Qual império construiu as pirâmides de Gizé?",
        options: [
          { id: "hist5_a", text: "Império Romano", isCorrect: false },
          { id: "hist5_b", text: "Império Grego", isCorrect: false },
          { id: "hist5_c", text: "Império Egípcio", isCorrect: true },
          { id: "hist5_d", text: "Império Persa", isCorrect: false },
        ],
        explanation: "As pirâmides de Gizé foram construídas durante o Antigo Império Egípcio, entre 2686 e 2181 a.C."
      }
    ]
  },
  {
    id: "geography",
    name: "Geografia",
    icon: "globe",
    description: "Perguntas sobre países, capitais, rios, montanhas e geografia física",
    questions: [
      {
        id: "geo1",
        text: "Qual é a capital da Austrália?",
        options: [
          { id: "geo1_a", text: "Sydney", isCorrect: false },
          { id: "geo1_b", text: "Melbourne", isCorrect: false },
          { id: "geo1_c", text: "Canberra", isCorrect: true },
          { id: "geo1_d", text: "Brisbane", isCorrect: false },
        ],
        explanation: "Canberra é a capital da Austrália, não Sydney ou Melbourne como muitos pensam."
      },
      {
        id: "geo2",
        text: "Qual é o maior país do mundo em área territorial?",
        options: [
          { id: "geo2_a", text: "China", isCorrect: false },
          { id: "geo2_b", text: "Estados Unidos", isCorrect: false },
          { id: "geo2_c", text: "Canadá", isCorrect: false },
          { id: "geo2_d", text: "Rússia", isCorrect: true },
        ],
        explanation: "A Rússia é o maior país do mundo em área territorial, com aproximadamente 17 milhões de km²."
      },
      {
        id: "geo3",
        text: "Qual é o rio mais longo do mundo?",
        options: [
          { id: "geo3_a", text: "Rio Amazonas", isCorrect: true },
          { id: "geo3_b", text: "Rio Nilo", isCorrect: false },
          { id: "geo3_c", text: "Rio Mississipi", isCorrect: false },
          { id: "geo3_d", text: "Rio Yangtze", isCorrect: false },
        ],
        explanation: "O Rio Amazonas é considerado o rio mais longo do mundo, com aproximadamente 6.992 km de extensão."
      },
      {
        id: "geo4",
        text: "Qual destes países não faz fronteira com o Brasil?",
        options: [
          { id: "geo4_a", text: "Uruguai", isCorrect: false },
          { id: "geo4_b", text: "Paraguai", isCorrect: false },
          { id: "geo4_c", text: "Equador", isCorrect: true },
          { id: "geo4_d", text: "Bolívia", isCorrect: false },
        ],
        explanation: "O Equador não faz fronteira com o Brasil. O Brasil faz fronteira com todos os países da América do Sul, exceto Chile e Equador."
      },
      {
        id: "geo5",
        text: "Qual é a cordilheira mais longa do mundo?",
        options: [
          { id: "geo5_a", text: "Himalaias", isCorrect: false },
          { id: "geo5_b", text: "Montanhas Rochosas", isCorrect: false },
          { id: "geo5_c", text: "Andes", isCorrect: true },
          { id: "geo5_d", text: "Alpes", isCorrect: false },
        ],
        explanation: "A Cordilheira dos Andes é a mais longa do mundo, com cerca de 7.000 km de extensão, atravessando sete países da América do Sul."
      }
    ]
  },
  {
    id: "custom",
    name: "Quiz Personalizado",
    icon: "pencil",
    description: "Crie seu próprio quiz com perguntas personalizadas",
    questions: []
  }
];
