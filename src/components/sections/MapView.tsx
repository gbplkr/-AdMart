import { Button } from '@/components/ui/button';

export default function MapView() {
  return (
    <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Placeholder */}
      <div className="w-full h-full flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202107.57791676176!2d126.8354892!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button variant="outline" size="sm" className="bg-white shadow-lg">
          일반지도
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg">
          위성지도
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-sm mb-2">범례</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">LED 전광판</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">실내광고</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-600">교통광고</span>
          </div>
        </div>
      </div>

      {/* Traffic Data Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-sm mb-2">실시간 유동인구</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">42,580명</div>
          <div className="text-xs text-gray-500">현재 주요 상권 평균</div>
        </div>
      </div>
    </div>
  );
}
