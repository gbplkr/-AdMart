import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    id: 1,
    type: 'achievement',
    user: 'MoonDancer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    action: 'unlocked',
    target: 'Perfect Combo Master',
    icon: Trophy,
    time: '2m ago'
  },
  {
    id: 2,
    type: 'highscore',
    user: 'K-PopStar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    action: 'scored',
    target: '125,890 pts on "DDU-DU DDU-DU"',
    icon: Star,
    time: '5m ago'
  },
  {
    id: 3,
    type: 'challenge',
    user: 'BeatMaster',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
    action: 'completed',
    target: 'Speed Demon Challenge',
    icon: Zap,
    time: '8m ago'
  },
  {
    id: 4,
    type: 'game',
    user: 'RhythmKing',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    action: 'started playing',
    target: 'Rhythm Rush',
    icon: Music,
    time: '12m ago'
  }
];

const getActivityColor = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'text-accent';
    case 'highscore':
      return 'text-primary';
    case 'challenge':
      return 'text-secondary';
    default:
      return 'text-foreground';
  }
};

export default function LiveActivity() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-3 h-3 bg-secondary rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-shadow-neon">
              Live Activity
            </h2>
          </div>
          <p className="text-xl font-ui text-muted-foreground">
            See what the community is up to right now
          </p>
        </motion.div>

        {/* Activity Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-white/10 hover:border-primary/30 transition-all cursor-pointer">
                  <div className="p-4 flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12 border-2 border-primary/50">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="font-ui text-sm mb-1">
                        <span className="font-bold text-foreground">{activity.user}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className={`font-semibold ${getActivityColor(activity.type)}`}>
                          {activity.target}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {activity.time}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={`p-2 glass rounded-lg ${getActivityColor(activity.type)}`}>
                      <Icon className="w-5 h-5" />
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
