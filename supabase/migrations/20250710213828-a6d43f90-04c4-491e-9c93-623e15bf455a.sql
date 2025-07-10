-- Create enum for module categories
CREATE TYPE public.module_category AS ENUM ('basics', 'network', 'web', 'mobile', 'forensics', 'cryptography', 'social_engineering');

-- Create enum for difficulty levels
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- Create enum for badge types
CREATE TYPE public.badge_type AS ENUM ('completion', 'streak', 'performance', 'special');

-- Create modules table
CREATE TABLE public.modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT, -- Markdown content
  category module_category NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'beginner',
  estimated_duration_minutes INTEGER DEFAULT 30,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  prerequisites UUID[], -- Array of module IDs that should be completed first
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz table
CREATE TABLE public.quiz (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  correct_answer INTEGER NOT NULL, -- Index of correct answer in options array
  explanation TEXT, -- Explanation for the correct answer
  points INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  quiz_score INTEGER, -- Points earned on quiz
  quiz_attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT, -- Icon name or URL
  badge_type badge_type NOT NULL,
  condition_data JSONB, -- Flexible conditions for earning badge
  points_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user badges table (many-to-many)
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create user quiz attempts table
CREATE TABLE public.user_quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quiz(id) ON DELETE CASCADE,
  selected_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_modules_category ON public.modules(category);
CREATE INDEX idx_modules_difficulty ON public.modules(difficulty);
CREATE INDEX idx_modules_order ON public.modules(order_index);
CREATE INDEX idx_quiz_module_id ON public.quiz(module_id);
CREATE INDEX idx_quiz_order ON public.quiz(order_index);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_module_id ON public.user_progress(module_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_quiz_attempts_user_id ON public.user_quiz_attempts(user_id);

-- RLS Policies for modules (publicly readable)
CREATE POLICY "Modules are viewable by everyone"
  ON public.modules
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Only admins can manage modules"
  ON public.modules
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for quiz (publicly readable)
CREATE POLICY "Quiz questions are viewable by everyone"
  ON public.quiz
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage quiz"
  ON public.quiz
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user progress (user-specific)
CREATE POLICY "Users can view their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
  ON public.user_progress
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for badges (publicly readable)
CREATE POLICY "Badges are viewable by everyone"
  ON public.badges
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage badges"
  ON public.badges
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user badges (user-specific)
CREATE POLICY "Users can view their own badges"
  ON public.user_badges
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn badges"
  ON public.user_badges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all user badges"
  ON public.user_badges
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for quiz attempts (user-specific)
CREATE POLICY "Users can view their own quiz attempts"
  ON public.user_quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can record their quiz attempts"
  ON public.user_quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all quiz attempts"
  ON public.user_quiz_attempts
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for timestamps
CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quiz_updated_at
  BEFORE UPDATE ON public.quiz
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically update user XP and level when progress changes
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_xp INTEGER;
  new_level TEXT;
BEGIN
  -- Calculate total XP from completed modules and quiz scores
  SELECT 
    COALESCE(SUM(
      CASE 
        WHEN up.status = 'completed' THEN 
          (m.estimated_duration_minutes / 10) + COALESCE(up.quiz_score, 0)
        ELSE 0 
      END
    ), 0) INTO total_xp
  FROM public.user_progress up
  JOIN public.modules m ON up.module_id = m.id
  WHERE up.user_id = NEW.user_id;

  -- Determine level based on XP
  IF total_xp >= 1000 THEN
    new_level := 'Expert';
  ELSIF total_xp >= 500 THEN
    new_level := 'Avancé';
  ELSIF total_xp >= 200 THEN
    new_level := 'Intermédiaire';
  ELSE
    new_level := 'Débutant';
  END IF;

  -- Update user profile
  UPDATE public.profiles 
  SET 
    xp = total_xp,
    level = new_level,
    updated_at = now()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- Create trigger to update user stats when progress changes
CREATE TRIGGER update_user_stats_trigger
  AFTER INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats();