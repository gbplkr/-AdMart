import { Search, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xl font-bold">K</span>
            </div>
            <span className="text-xl font-bold text-gray-800">광고플레이</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800" asChild>
              <Link to="/">로그인</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800" asChild>
              <Link to="/">회원가입</Link>
            </Button>
            <div className="flex items-center gap-2 text-primary">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">1533-1975</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="원하시는 매체를 검색해보세요"
              className="w-full pl-10 pr-4 h-12 border-2 border-gray-200 focus:border-primary rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg">
            검색
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-8">
            <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-primary" asChild>
              <Link to="/?category=building">빌딩</Link>
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-primary" asChild>
              <Link to="/?category=traffic">교통</Link>
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-primary" asChild>
              <Link to="/?category=shopping">쇼핑</Link>
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-primary" asChild>
              <Link to="/?category=living">생활</Link>
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-primary" asChild>
              <Link to="/?category=elevator">아파트/오피스 엘리베이터</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
