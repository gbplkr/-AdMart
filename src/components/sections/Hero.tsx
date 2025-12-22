import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh"></div>
      
      {/* Geometric Decorations */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/30 rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 border-2 border-secondary/30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6 px-4 py-2 glass rounded-full">
            <span className="text-sm font-ui text-primary">🎮 NEW EVENT: BLACKPINK CHALLENGE LIVE</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-extrabold mb-6 text-shadow-neon bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            PLAY THE BEAT
          </h1>
          
          <p className="text-xl md:text-2xl font-ui text-muted-foreground mb-12 max-w-2xl mx-auto">
            Compete in rhythm games, ace K-pop trivia, and challenge fans worldwide. 
            <span className="text-primary"> Level up your stan game.</span>
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button 
              size="lg" 
              className="group h-14 px-8 bg-primary hover:bg-primary/90 text-background font-ui font-bold text-lg rounded-full glow-cyan transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Playing
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 glass border-primary/50 hover:border-primary text-primary font-ui font-bold text-lg rounded-full"
            >
              Watch Tutorial
            </Button>
          </div>

          {/* Live Stats */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-primary">24K+</div>
              <div className="text-sm font-ui text-muted-foreground">Players Online</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-secondary">156</div>
              <div className="text-sm font-ui text-muted-foreground">Active Games</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-accent">89K</div>
              <div className="text-sm font-ui text-muted-foreground">Daily Challenges</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
