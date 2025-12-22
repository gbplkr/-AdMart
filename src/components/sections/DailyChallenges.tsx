import { motion } from 'framer-motion';
import { Trophy, Clock, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const challenges = [
  {
    id: 1,
    title: 'Perfect Combo Master',
    description: 'Hit 100 perfect notes in a row',
    reward: '500 XP + Rare Badge',
    timeLeft: '4h 32m',
    progress: 67,
    difficulty: 'Hard',
    icon: Star
  },
  {
    id: 2,
    title: 'Speed Demon',
    description: 'Complete 5 songs on Expert difficulty',
    reward: '1000 XP + Epic Avatar',
    timeLeft: '2h 15m',
    progress: 40,
    difficulty: 'Expert',
    icon: Zap
  },
  {
    id: 3,
    title: 'Trivia Champion',
    description: 'Answer 50 trivia questions correctly',
    reward: '300 XP + Title',
    timeLeft: '6h 45m',
    progress: 82,
    difficulty: 'Medium',
    icon: Trophy
  }
];

export default function DailyChallenges() {
  return (
    <section className="py-24 px-6 relative noise">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-display font-extrabold mb-4 text-shadow-neon"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Daily Challenges
            </motion.h2>
            <motion.p
              className="text-xl font-ui text-muted-foreground"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Complete challenges to earn exclusive rewards
            </motion.p>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-mono font-bold text-primary mb-1">23:45:12</div>
              <div className="text-sm font-ui text-muted-foreground">Until Reset</div>
            </div>
          </motion.div>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="group relative overflow-hidden glass border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-105 cursor-pointer h-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 glass rounded-xl group-hover:glow-lime transition-all">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="glass font-ui text-secondary border-secondary/50"
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-grow mb-6">
                      <h3 className="text-2xl font-display font-bold mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 font-body">
                        {challenge.description}
                      </p>

                      {/* Reward */}
                      <div className="glass rounded-lg p-3 mb-4">
                        <div className="text-xs text-muted-foreground font-ui mb-1">Reward</div>
                        <div className="text-sm font-ui font-semibold text-accent">{challenge.reward}</div>
                      </div>

                      {/* Progress */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-ui text-muted-foreground">Progress</span>
                          <span className="font-mono font-bold text-primary">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="font-mono text-secondary">{challenge.timeLeft}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-background font-ui font-bold rounded-full"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
