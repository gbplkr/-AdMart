import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const artists = [
  {
    id: 1,
    name: 'BLACKPINK',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    songs: 24,
    plays: '2.4M'
  },
  {
    id: 2,
    name: 'BTS',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    songs: 32,
    plays: '5.1M'
  },
  {
    id: 3,
    name: 'TWICE',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80',
    songs: 28,
    plays: '3.2M'
  },
  {
    id: 4,
    name: 'SEVENTEEN',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    songs: 21,
    plays: '1.8M'
  },
  {
    id: 5,
    name: 'ITZY',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    songs: 18,
    plays: '1.5M'
  }
];

export default function ArtistCarousel() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -skew-y-3 scale-110"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-display font-extrabold mb-4 text-shadow-neon"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Featured Artists
          </motion.h2>
          <motion.p
            className="text-xl font-ui text-muted-foreground"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Play games featuring your favorite K-pop groups
          </motion.p>
        </div>

        {/* Artist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden glass border-white/10 hover:border-primary/50 transition-all duration-500 cursor-pointer">
                {/* Artist Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 glow-cyan"
                    >
                      <Play className="w-8 h-8 text-background" fill="currentColor" />
                    </Button>
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-4">
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-ui">{artist.songs} songs</span>
                    <span className="font-mono text-accent">{artist.plays}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
