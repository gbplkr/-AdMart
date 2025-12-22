import { MapPin, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const locations = [
  {
    id: 1,
    name: '강남역 교차로',
    type: 'LED 전광판',
    region: '강남구',
    views: '2.4M',
    traffic: '24,000명/일',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80',
    price: '3,500,000원'
  },
  {
    id: 2,
    name: '명동 중앙거리',
    type: '디지털사이니지',
    region: '중구',
    views: '3.2M',
    traffic: '35,000명/일',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80',
    price: '5,200,000원'
  },
  {
    id: 3,
    name: '여의도 IFC몰',
    type: '실내광고',
    region: '영등포구',
    views: '1.8M',
    traffic: '18,500명/일',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    price: '2,800,000원'
  },
  {
    id: 4,
    name: '홍대입구역',
    type: '지하철광고',
    region: '마포구',
    views: '4.1M',
    traffic: '42,000명/일',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&q=80',
    price: '4,500,000원'
  },
  {
    id: 5,
    name: '코엑스몰',
    type: '실내LED',
    region: '강남구',
    views: '2.9M',
    traffic: '28,000명/일',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80',
    price: '4,200,000원'
  },
  {
    id: 6,
    name: '신촌 연세로',
    type: '옥외광고',
    region: '서대문구',
    views: '2.1M',
    traffic: '21,000명/일',
    image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=400&q=80',
    price: '3,000,000원'
  }
];

export default function LocationGrid() {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">추천 광고 매체</h2>
        <p className="text-gray-600">최고의 효과를 보장하는 프리미엄 광고 위치</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            전체 선택
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/?view=map">지도에서 보기</Link>
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          총 <span className="font-semibold text-primary">156개</span> 매체
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Link key={location.id} to={`/?location=${location.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                    {location.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-primary/90 text-white hover:bg-primary">
                    추천
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors">
                    {location.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{location.region}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-gray-600">{location.views}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-gray-600">{location.traffic}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">월 광고비</div>
                    <div className="text-lg font-bold text-primary">{location.price}</div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={(e) => e.preventDefault()}>
                    문의하기
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
