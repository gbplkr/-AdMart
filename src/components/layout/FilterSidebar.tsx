import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function FilterSidebar() {
  const [searchParams] = useSearchParams();
  
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Region Filter */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">지역 바로가기</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-primary hover:bg-gray-50" asChild>
              <Link to="/?region=all">전국</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-primary hover:bg-gray-50" asChild>
              <Link to="/?region=metropolitan">수도권</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-primary hover:bg-gray-50" asChild>
              <Link to="/?region=seoul">서울시</Link>
            </Button>
            <div className="pl-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm text-gray-500 hover:text-primary hover:bg-gray-50" asChild>
                <Link to="/?region=gangnam">강남/서초/송파/강동</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-gray-500 hover:text-primary hover:bg-gray-50" asChild>
                <Link to="/?region=jongno">종로/중구/용산</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-gray-500 hover:text-primary hover:bg-gray-50" asChild>
                <Link to="/?region=gangseo">강서/양천/구로/금천</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Media Type Filter */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">매체 종류</h3>
          <div className="space-y-2">
            {['LED', '전광판', '디지털사이니지', '옥외광고', '교통광고', '실내광고'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <Label htmlFor={type} className="text-sm text-gray-600 cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics Filter */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">타겟 성별</h3>
          <div className="space-y-2">
            {['전체', '남성', '여성'].map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox id={gender} />
                <Label htmlFor={gender} className="text-sm text-gray-600 cursor-pointer">
                  {gender}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Age Filter */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">타겟 연령</h3>
          <div className="space-y-2">
            {['전체', '10대', '20대', '30대', '40대', '50대 이상'].map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <Checkbox id={age} />
                <Label htmlFor={age} className="text-sm text-gray-600 cursor-pointer">
                  {age}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">예산</h3>
          <div className="space-y-2">
            {['전체', '100만원 미만', '100~300만원', '300~500만원', '500~1000만원', '1000만원 이상'].map((budget) => (
              <div key={budget} className="flex items-center space-x-2">
                <Checkbox id={budget} />
                <Label htmlFor={budget} className="text-sm text-gray-600 cursor-pointer">
                  {budget}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6 space-y-2">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
            필터 적용
          </Button>
          <Button variant="outline" className="w-full">
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
