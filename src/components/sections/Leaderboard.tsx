import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const topPlayers = [
  {
    rank: 1,
    name: 'StarBurst',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    points: 156420,
    trend: 'up',
    change: 2
  },
  {
    rank: 2,
    name: 'MoonKnight',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
    points: 142890,
    trend: 'down',
    change: 1
  },
  {
    rank: 3,
    name: 'K-PopQueen',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80',
    points: 138765,
    trend: 'same',
    change: 0
  },
  {
    rank: 4,
    name: 'RhythmMaster',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    points: 125340,
    trend: 'up',
    change: 3
  },
  {
    rank: 5,
    name: 'BeatHunter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    points: 118920,
    trend: 'up',
    change: 1
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-accent" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-secondary" />;
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'text-accent';
    case 2:
      return 'text-primary';
    case 3:
      return 'text-secondary';
    default:
      return 'text-foreground';
  }
};

export default function Leaderboard() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Crown className="w-8 h-8 text-accent" />
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-shadow-neon">
                  Top Players
                </h2>
              </div>
            </motion.div>

            <Card className="glass border-white/10 overflow-hidden">
              <div className="p-6 space-y-4">
                {topPlayers.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="group flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-all cursor-pointer">
                      {/* Rank */}
                      <div className={`text-3xl font-mono font-bold w-12 text-center ${getRankColor(player.rank)}`}>
                        {player.rank}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-12 h-12 border-2 border-primary">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-bold text-lg">{player.name}</span>
                          {player.rank <= 3 && (
                            <Crown className={`w-4 h-4 ${getRankColor(player.rank)}`} />
                          )}
                        </div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {player.points.toLocaleString()} pts
                        </div>
                      </div>

                      {/* Trend */}
                      <div className="flex items-center gap-2">
                        {getTrendIcon(player.trend)}
                        {player.change > 0 && (
                          <span className="text-sm font-mono text-muted-foreground">
                            {player.change}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Your Rank Widget */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold mb-6">Your Rank</h3>
              
              <Card className="glass border-white/10 overflow-hidden mb-6">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary glow-cyan">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="font-display font-bold text-xl mb-2">GamerPro</div>
                    <Badge className="glass border-primary/50 text-primary font-ui">
                      Level 24
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="glass rounded-lg p-4">
                      <div className="text-sm text-muted-foreground font-ui mb-1">Current Rank</div>
                      <div className="text-3xl font-mono font-bold text-primary">#847</div>
                    </div>

                    <div className="glass rounded-lg p-4">
                      <div className="text-sm text-muted-foreground font-ui mb-1">Total Points</div>
                      <div className="text-3xl font-mono font-bold text-accent">82,340</div>
                    </div>

                    <div className="glass rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground font-ui">Next Rank</span>
                        <span className="text-sm font-mono text-secondary">1,260 pts</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass border-white/10 p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-primary mb-1">156</div>
                  <div className="text-xs text-muted-foreground font-ui">Games Played</div>
                </Card>
                <Card className="glass border-white/10 p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-accent mb-1">89%</div>
                  <div className="text-xs text-muted-foreground font-ui">Win Rate</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
