
import React from 'react';

interface QuestionOption {
    value: string;
    label: string;
    description: string;
}

interface Question {
    id: string;
    title: string;
    subtitle: string;
    type: 'single' | 'multiple';
    options: QuestionOption[];
}

interface QuizQuestionProps {
    question: Question;
    answer: string | string[] | undefined;
    onAnswer: (questionId: string, value: string | string[]) => void;
}

export default function QuizQuestion({ question, answer, onAnswer }: QuizQuestionProps) {

    const handleSingleSelect = (value: string) => {
        onAnswer(question.id, value);
    };

    const handleMultipleSelect = (value: string) => {
        const currentAnswers = Array.isArray(answer) ? answer : [];
        if (value === 'none') {
            // If "none" is clicked, clear everything else and set only "none"
            onAnswer(question.id, ['none']);
            return;
        }

        // If user clicks another option while "none" is selected, remove "none"
        const filteredAnswers = currentAnswers.filter(a => a !== 'none');
        const newAnswers = filteredAnswers.includes(value)
            ? filteredAnswers.filter(a => a !== value)
            : [...filteredAnswers, value];

        onAnswer(question.id, newAnswers);
    };

    const isSelected = (value: string) => {
        if (question.type === 'single') {
            return answer === value;
        } else {
            return Array.isArray(answer) && answer.includes(value);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                    {question.title}
                </h2>
                <p className="text-lg text-foreground">
                    {question.subtitle}
                </p>
                {question.type === 'multiple' && (
                    <p className="text-sm mt-2 text-foreground">
                        Select all that apply
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => question.type === 'single'
                            ? handleSingleSelect(option.value)
                            : handleMultipleSelect(option.value)
                        }
                        className={` p-6 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105
                            ${isSelected(option.value) ? 'border-orange-500 ' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className={`font-semibold text-lg mb-2 ${isSelected(option.value)
                                    ? 'text-orange-600 dark:text-orange-400'
                                    : "text-foreground"
                                    }`}>
                                    {option.label}
                                </h3>
                                <p className={`text-sm ${isSelected(option.value)
                                    ? 'text-orange-600 dark:text-orange-300'
                                    : "text-foreground"
                                    }`}>
                                    {option.description}
                                </p>
                            </div>
                            {isSelected(option.value) && (
                                <div className="ml-4 flex-shrink-0">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span className='text-foreground text-lg'>✔</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};