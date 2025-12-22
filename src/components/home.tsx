import Navbar from '@/components/layout/Navbar';
import FilterSidebar from '@/components/layout/FilterSidebar';
import LocationGrid from '@/components/sections/LocationGrid';
import MapView from '@/components/sections/MapView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-[140px]">
        <div className="flex h-[calc(100vh-140px)]">
          {/* Sidebar */}
          <FilterSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <Tabs defaultValue="grid" className="flex-1 flex flex-col">
              <div className="border-b border-gray-200 bg-white px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="grid" className="px-6">
                    목록보기
                  </TabsTrigger>
                  <TabsTrigger value="map" className="px-6">
                    지도보기
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="flex-1 mt-0 overflow-y-auto">
                <LocationGrid />
              </TabsContent>
              
              <TabsContent value="map" className="flex-1 mt-0 p-6">
                <MapView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

