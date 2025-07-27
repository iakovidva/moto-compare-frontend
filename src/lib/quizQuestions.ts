export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type UseCase = 'commuting' | 'touring' | 'sport' | 'adventure' | 'offroad';
export type Height = 'short' | 'average' | 'tall';
export type SizeComfort = 'lightweight' | 'medium' | 'confident';
export type Feature = 'fuel-economy' | 'quickshifter' | 'abs' | 'traction-control' | 'cruise-control' | 'none';
export type UserPreference = 'new-bike' | 'japan' | 'europe' | 'none';

export interface QuizAnswers {
  experience: Experience;
  useCase: UseCase;
  height: Height;
  sizeComfort: SizeComfort;
  features: Feature[];
  userPreferences: UserPreference[];
}

export const questions = [
  {
    id: 'experience',
    title: 'What’s your riding experience?',
    subtitle: 'Help us understand your skill level',
    type: 'single' as const,
    options: [
      { value: 'beginner', label: 'Beginner', description: 'New to motorcycles or less than 1 year' },
      { value: 'intermediate', label: 'Intermediate', description: '1 to 3 years of riding experience' },
      { value: 'advanced', label: 'Advanced', description: 'More than 3 years of riding experience' }
    ]
  },
  {
    id: 'useCase',
    title: 'How do you plan to use your bike?',
    subtitle: 'Choose the riding style that fits your needs',
    type: 'single' as const,
    options: [
      { value: 'commuting', label: 'Commuting (City)', description: 'Daily urban rides and short trips' },
      { value: 'touring', label: 'Touring (Highway)', description: 'Comfortable long-distance travel' },
      { value: 'sport', label: 'Sport', description: 'Speed-focused riding and track days' },
      { value: 'adventure', label: 'Adventure', description: 'Versatile rides on mixed terrain' },
      { value: 'offroad', label: 'Off-Road', description: 'Enduro-style dirt and trail riding' }
    ]
  },
  {
    id: 'height',
    title: 'How tall are you?',
    subtitle: 'Seat height can affect riding confidence and comfort',
    type: 'single' as const,
    options: [
      { value: 'short', label: 'Under 170cm', description: 'I prefer lower seat height and flat footing' },
      { value: 'average', label: '170cm - 185cm', description: 'I fit comfortably on most bikes' },
      { value: 'tall', label: 'Over 185cm', description: 'I need bikes with more legroom and upright posture' }
    ]
  },
  {
    id: 'sizeComfort',
    title: 'How comfortable are you with heavier bikes?',
    subtitle: 'Bigger bikes offer power, but can feel bulky',
    type: 'single' as const,
    options: [
      { value: 'lightweight', label: 'Lightweight Only', description: 'I want nimble and easy-to-handle bikes' },
      { value: 'medium', label: 'Moderately Comfortable', description: 'I’m okay with mid-weight motorcycles' },
      { value: 'confident', label: 'Confident with Any Size', description: 'I can handle anything' }
    ]
  },
  {
    id: 'features',
    title: 'Which features are important to you?',
    subtitle: 'Select all that apply',
    type: 'multiple' as const,
    options: [
      { value: 'fuel-economy', label: 'Fuel Economy', description: 'Low consumption for longer rides' },
      { value: 'quickshifter', label: 'Quickshifter', description: 'Clutchless up/down shifting' },
      { value: 'abs', label: 'ABS', description: 'Anti-lock braking system for safety' },
      { value: 'traction-control', label: 'Traction Control', description: 'Stability and grip assistance' },
      { value: 'cruise-control', label: 'Cruise Control', description: 'Automatic speed control' },
      { value: 'none', label: 'None of the above', description: 'I don’t care about these features' }
    ]
  },
  {
    id: 'userPreferences',
    title: 'Final preferences',
    subtitle: 'A few last details to refine your match',
    type: 'multiple' as const,
    options: [
      { value: 'new-bike', label: 'New Bike (2020+)', description: 'Only interested in newer models' },
      { value: 'japan', label: 'Japanese Manufacturer Fan', description: 'Prefer brands like Honda, Yamaha, etc.' },
      { value: 'europe', label: 'European Manufacturer Fan', description: 'Prefer brands like BMW, Ducati, etc.' },
      { value: 'none', label: 'None of the above', description: 'No specific preferences here' }
    ]
  }
];
