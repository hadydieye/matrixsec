-- Insert sample modules based on the existing static data
INSERT INTO public.modules (title, description, content, category, difficulty, estimated_duration_minutes, order_index) VALUES
-- Hacking Éthique
('Introduction au Hacking Éthique', 'Découvrez les bases du hacking éthique et l''importance de la cybersécurité.', '# Introduction au Hacking Éthique\n\nDans ce module, vous découvrirez...\n\n## Objectifs\n- Comprendre les concepts de base\n- Apprendre les méthodologies\n- Connaître les outils essentiels', 'basics', 'beginner', 45, 1),
('Reconnaissance et Énumération', 'Apprenez les techniques de reconnaissance passive et active.', '# Reconnaissance et Énumération\n\nLa reconnaissance est la première phase...', 'network', 'beginner', 60, 2),
('Scanning et Vulnérabilités', 'Maîtrisez les outils de scan et l''identification des vulnérabilités.', '# Scanning et Vulnérabilités\n\nLe scanning permet d''identifier...', 'network', 'intermediate', 75, 3),
('Exploitation Web', 'Exploitez les vulnérabilités web les plus courantes.', '# Exploitation Web\n\nLes applications web sont souvent...', 'web', 'intermediate', 90, 4),
('Post-Exploitation', 'Techniques avancées après compromission d''un système.', '# Post-Exploitation\n\nAprès avoir obtenu un accès...', 'network', 'advanced', 120, 5),

-- Red Teaming
('Planification Red Team', 'Méthodologie et planification d''une opération Red Team.', '# Planification Red Team\n\nLe Red Teaming requiert une approche structurée...', 'basics', 'intermediate', 90, 6),
('OSINT Avancé', 'Techniques avancées de renseignement en sources ouvertes.', '# OSINT Avancé\n\nL''OSINT est crucial pour...', 'basics', 'intermediate', 75, 7),
('Social Engineering', 'Psychologie et techniques de manipulation.', '# Social Engineering\n\nL''ingénierie sociale exploite...', 'social_engineering', 'intermediate', 60, 8),
('Persistence et Évasion', 'Maintenir l''accès et éviter la détection.', '# Persistence et Évasion\n\nMaintenir l''accès à un système...', 'network', 'advanced', 105, 9),

-- Blue Teaming
('Monitoring et Détection', 'Mise en place de systèmes de surveillance efficaces.', '# Monitoring et Détection\n\nLa surveillance continue est essentielle...', 'network', 'intermediate', 80, 10),
('Analyse de Logs', 'Techniques d''analyse des journaux système.', '# Analyse de Logs\n\nLes logs contiennent des informations cruciales...', 'forensics', 'intermediate', 70, 11),
('Response Incidente', 'Procédures de réponse aux incidents de sécurité.', '# Response Incidente\n\nUne réponse rapide et efficace...', 'basics', 'advanced', 95, 12),
('Threat Hunting', 'Chasse proactive aux menaces.', '# Threat Hunting\n\nLa chasse aux menaces est une approche proactive...', 'network', 'expert', 110, 13);

-- Get module IDs for quiz insertion
WITH module_ids AS (
  SELECT id, title FROM public.modules
)

-- Insert quiz questions
INSERT INTO public.quiz (module_id, question, options, correct_answer, explanation, points, order_index) 
SELECT 
  m.id,
  'Quelle est la première phase d''un test de pénétration ?',
  '["Reconnaissance", "Exploitation", "Post-exploitation", "Reporting"]'::jsonb,
  0,
  'La reconnaissance est toujours la première phase d''un test de pénétration.',
  10,
  1
FROM module_ids m WHERE m.title = 'Introduction au Hacking Éthique'

UNION ALL

SELECT 
  m.id,
  'Quel outil est couramment utilisé pour le scanning de ports ?',
  '["Nmap", "Wireshark", "Metasploit", "Burp Suite"]'::jsonb,
  0,
  'Nmap est l''outil de référence pour le scanning de ports.',
  10,
  1
FROM module_ids m WHERE m.title = 'Scanning et Vulnérabilités'

UNION ALL

SELECT 
  m.id,
  'Que signifie OSINT ?',
  '["Open Source Intelligence", "Operational Security Intelligence", "Online Security Information", "Open System Integration"]'::jsonb,
  0,
  'OSINT signifie Open Source Intelligence, le renseignement en sources ouvertes.',
  10,
  1
FROM module_ids m WHERE m.title = 'OSINT Avancé'

UNION ALL

SELECT 
  m.id,
  'Quel est l''objectif principal du Blue Team ?',
  '["Attaquer les systèmes", "Défendre les systèmes", "Développer des malwares", "Former les utilisateurs"]'::jsonb,
  1,
  'Le Blue Team a pour rôle principal de défendre les systèmes contre les attaques.',
  10,
  1
FROM module_ids m WHERE m.title = 'Monitoring et Détection';

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, badge_type, condition_data, points_reward) VALUES
('Premier Pas', 'Terminez votre premier module', 'trophy', 'completion', '{"modules_completed": 1}'::jsonb, 50),
('Débutant Confirmé', 'Terminez 3 modules', 'star', 'completion', '{"modules_completed": 3}'::jsonb, 100),
('Expert en Herbe', 'Terminez 5 modules', 'crown', 'completion', '{"modules_completed": 5}'::jsonb, 200),
('Quiz Master', 'Obtenez 100% à 5 quiz', 'brain', 'performance', '{"perfect_quizzes": 5}'::jsonb, 150),
('Marathonien', 'Passez 10 heures d''apprentissage', 'clock', 'streak', '{"total_time_minutes": 600}'::jsonb, 300);