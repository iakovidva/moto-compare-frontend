import { QuizAnswers } from "@/lib/quizQuestions";
import { Button } from "../ui/button";
import Link from "next/link";
import { MotorcycleSummary, RankedMotorcycleSummary } from "@/models/MotorcycleSummary";
import Image from "next/image";
import CompareToggleButton from "../comparison/CompareToggleButton";

interface QuizResultsProps {
    answers: Partial<QuizAnswers>
    quizResults: RankedMotorcycleSummary[],
    onReset: () => void
}


export default function QuizResults({ quizResults, onReset, answers }: QuizResultsProps) {

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Your Perfect Motorcycle Match!
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Based on your preferences, here are our recommendations
                        </p>
                    </div>

                    <div className="bg-card rounded-lg shadow-lg p-6 mb-8 border border-border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {quizResults.map((bike, index) => (
                                <div key={index} className="relative bg-muted rounded-2xl p-4 border border-border shadow-md hover:shadow-lg transition-shadow">
                                    {/* Match percentage badge */}
                                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                                        {bike.score} % Match
                                    </div>

                                    {/* Motorcycle Image */}
                                    <div className="h-32 bg-gradient-to-br from-muted to-muted/80 rounded mb-3 flex items-center justify-center overflow-hidden">
                                        <Image
                                            alt={`${bike.manufacturer} ${bike.model}`}
                                            src={bike.image}
                                            width={200}
                                            height={100}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    </div>

                                    {/* Bike Name */}
                                    <h3 className="font-semibold text-foreground text-lg mb-1">{bike.manufacturer} {bike.model}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{bike.yearRange}</p>

                                    {/* Key Specs */}
                                    <div className="text-sm text-foreground space-y-1 mb-4">
                                        <div><strong>Displacement:</strong> {bike.displacement}cc</div>
                                        <div><strong>Horsepower:</strong> {bike.horsePower} hp</div>
                                        <div><strong>Fuel Consumption:</strong> {bike.fuelConsumption} L/100km</div>
                                        <div><strong>Weight:</strong> {bike.weight} kg</div>
                                    </div>

                                    {/* Call to Action */}
                                    <CompareToggleButton bike={bike} compact />
                                    <Button variant="outline" size="sm" className="w-full mt-2">
                                        View Details
                                    </Button>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                        <h3 className="text-xl font-bold text-foreground mb-4">Your Quiz Answers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {Object.entries(answers).map(([question, answer]) => (
                                <div key={question} className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground capitalize">
                                        {question.replace(/([A-Z])/g, ' $1').trim()}:
                                    </span>
                                    <span className="font-medium text-foreground capitalize">{answer}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button onClick={onReset} variant="outline">
                                <span className="text-xl">⟲ </span> Retake Quiz
                            </Button>
                            <Link href={"/motorcycles"}>
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    Browse All Motorcycles
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 