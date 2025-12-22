import { motion } from 'framer-motion';
import { Users, Trophy, Music, Brain, Camera, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const games = [
  {
    id: 1,
    title: 'Rhythm Rush',
    description: 'Hit the beats to your favorite K-pop tracks',
    players: 12543,
    icon: Music,
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    difficulty: 'Medium'
  },
  {
    id: 2,
    title: 'Trivia Master',
    description: 'Test your K-pop knowledge against the world',
    players: 8921,
    icon: Brain,
    color: 'secondary',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    difficulty: 'Easy'
  },
  {
    id: 3,
    title: 'Photo Match',
    description: 'Identify members in lightning speed',
    players: 6782,
    icon: Camera,
    color: 'accent',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    difficulty: 'Hard'
  },
  {
    id: 4,
    title: 'Speed Challenge',
    description: 'Race against time in fast-paced mini games',
    players: 5420,
    icon: Zap,
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80',
    difficulty: 'Hard'
  },
  {
    id: 5,
    title: 'Multiplayer Arena',
    description: 'Battle other players in real-time',
    players: 15234,
    icon: Trophy,
    color: 'secondary',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
    difficulty: 'Medium'
  },
  {
    id: 6,
    title: 'Daily Tournament',
    description: 'Compete for exclusive rewards',
    players: 9876,
    icon: Trophy,
    color: 'accent',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
    difficulty: 'Expert'
  }
];

const difficultyColors: Record<string, string> = {
  'Easy': 'text-accent border-accent/50',
  'Medium': 'text-primary border-primary/50',
  'Hard': 'text-secondary border-secondary/50',
  'Expert': 'text-secondary border-secondary/50'
};

export default function GameGrid() {
  return (
    <section className="py-24 px-6 relative noise">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-display font-extrabold mb-4 text-shadow-neon"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Game
          </motion.h2>
          <motion.p
            className="text-xl font-ui text-muted-foreground"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Compete, level up, and dominate the leaderboard
          </motion.p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden glass border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 h-72 flex flex-col justify-between">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className={`p-3 glass rounded-xl group-hover:glow-${game.color} transition-all`}>
                        <Icon className={`w-6 h-6 text-${game.color}`} />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`glass font-ui ${difficultyColors[game.difficulty]}`}
                      >
                        {game.difficulty}
                      </Badge>
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-shadow-neon">
                        {game.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 font-body">
                        {game.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-mono text-primary">{game.players.toLocaleString()}</span>
                        <span className="text-muted-foreground font-ui">playing now</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-${game.color} rounded-lg transition-colors pointer-events-none`}></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
