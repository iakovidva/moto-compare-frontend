"use client"

import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { fetchQuizResultMotorcycles } from "@/lib/api/motorcycles";
import { questions, QuizAnswers } from "@/lib/quizQuestions";
import { RankedMotorcycleSummary } from "@/models/MotorcycleSummary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
    const [showResults, setShowResults] = useState(false);
    const [quizResults, setQuizResults] = useState<RankedMotorcycleSummary[] | null>(null);

    const handleAnswer = (questionId: string, value: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
    };

    const currentQuestionData = questions[currentQuestion];
    const currentAnswer = answers[currentQuestionData?.id as keyof QuizAnswers];
    const canProceed = currentAnswer && (
        Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer.length > 0
    );

    useEffect(() => {
        if (showResults) {
            const fetchResults = async () => {
                const result = await fetchQuizResultMotorcycles(answers);
                setQuizResults(normalizeScores(result!)) // wrap in array or empty
            };
            fetchResults();
        }
    }, [showResults, answers]);


    function normalizeScores(quizResults: RankedMotorcycleSummary[]): RankedMotorcycleSummary[] {
        const max = Math.max(...quizResults.map(r => r.score), 1);
        const factor = 100 / max;

        return quizResults.map(r => ({
            ...r,
            score: Math.round(r.score * factor),
        }));
    }

    if (quizResults) {

        return <QuizResults answers={answers} quizResults={quizResults} onReset={resetQuiz} />;
    }

    return (
        <div className="bg-backround min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
                        <span>← Back to Home</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                            Find Your Perfect Bike
                        </h1>
                        <p className="text-xl mb-6 text-foreground">
                            Answer a few questions and we'll recommend the best motorcycles for you
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <div
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="text-sm text-foreground">
                            Question {currentQuestion + 1} of {questions.length}
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className="max-w-3xl mx-auto">
                    <QuizQuestion
                        question={currentQuestionData}
                        answer={currentAnswer}
                        onAnswer={handleAnswer}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8">
                        <Button
                            variant="outline"
                            onClick={prevQuestion}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2"
                        >
                            <span>← Previous</span>
                        </Button>

                        <Button
                            onClick={resetQuiz}
                            variant="ghost"
                            className="flex items-center gap-2"
                        >
                            <span><span className="text-xl">⟲</span> Start Over</span>
                        </Button>

                        <Button
                            onClick={nextQuestion}
                            disabled={!canProceed}
                            className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                        >
                            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                            <span>→</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

