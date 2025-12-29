import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

interface Location {
  id: number;
  title: string;
  lat: number;
  lng: number;
  desc: string;
  img: string;
  category: string[];
}

const locations: Location[] = [
  { id: 1, title: "Gangnam Station", lat: 37.4979, lng: 127.0276, desc: "High traffic commercial district", img: "https://english.seoul.go.kr/wp-content/uploads/2016/03/gangnam_07.jpg", category: ["Traffic"] },
  { id: 2, title: "Gyeongbokgung", lat: 37.5796, lng: 126.9770, desc: "Tourist landmark", img: "https://www.ourbigjourney.com/wp-content/uploads/2023/04/DSC09561.jpg", category: ["Building"] },
  { id: 3, title: "Incheon Airport", lat: 37.4602, lng: 126.4407, desc: "International airport", img: "https://airssist.com/wp-content/uploads/2023/05/Incheon-Airport-Photo-798x798.jpg", category: ["Life", "Traffic"] },
  { id: 4, title: "COEX Mall", lat: 37.5120, lng: 127.0580, desc: "Shopping center", img: "https://www.kkday.com/en/blog/wp-content/uploads/kr_coex-1.jpg", category: ["Shopping"] }
];

const translations = {
  en: {
    searchPlaceholder: "Search locations",
    categories: ["Entire", "Building", "Traffic", "Shopping", "Life"],
    modalTitles: {
      1: "Large Billboard Ads",
      2: "Shopping Mall / Plaza Ads",
      3: "Subway / Bus Ads",
      4: "Apartment / Office Ads",
      5: "★ Celebrity / Star Photo Points ★",
      6: "★ Hot Place! Time Sync! ★",
      7: "★ Package Special! ★"
    },
    modalTexts: {
      1: "Impactful large-scale advertising to boost brand value",
      2: "Promote at locations with high customer access",
      3: "Exposed to mass targets using public transport",
      4: "Focused promotion in residential and business areas",
      5: "3 days, 7 days, 15 days",
      6: "Culture, art, festival, tourism",
      7: "Affordable billboard package"
    }
  },
  kr: {
    searchPlaceholder: "위치 검색",
    categories: ["전체", "건물", "교통", "쇼핑", "생활"],
    modalTitles: {
      1: "대형 전광판 광고",
      2: "쇼핑몰 · 광장 광고",
      3: "지하철 · 버스 광고",
      4: "아파트 · 오피스 광고",
      5: "★ 인물 · 스타 인증샷 포인트 ★",
      6: "★ 핫플! 타임싱크! ★",
      7: "★ 패키지 특가! ★"
    },
    modalTexts: {
      1: "압도적 스케일과 임팩트 확실하게! 브랜드 가치 제고",
      2: "고객 접근성이 뛰어난 위치에서 홍보",
      3: "대중교통을 이용하는 다수 타겟에게 노출",
      4: "주거지역과 업무지역 집중 홍보",
      5: "3일, 7일, 15일",
      6: "문화・예술・축제・관광",
      7: "합리적인 비용 전광판 패키지"
    }
  }
};

const modalData = {
  1: {
    title: "대형 전광판 광고",
    image: "https://cdn.crowdpic.net/detail-thumb/thumb_d_FFCF185383F07ECD946674C1EDE4E3E3.jpg",
    text: "압도적 스케일과 임팩트 확실하게! 브랜드 가치 제고"
  },
  2: {
    title: "쇼핑몰 · 광장 광고",
    image: "https://cdn.imweb.me/thumbnail/20250418/b47b0236e902b.jpg",
    text: "고객 접근성이 뛰어난 위치에서 홍보"
  },
  3: {
    title: "지하철 · 버스 광고",
    image: "https://i.pinimg.com/originals/3d/6c/c2/3d6cc2e514ab2344ba1dd8e5ad456f19.jpg",
    text: "대중교통을 이용하는 다수 타겟에게 노출"
  },
  4: {
    title: "아파트 · 오피스 광고",
    image: "https://tse3.mm.bing.net/th/id/OIP.1dSlW2ETs0SL-y67ElBqrgHaDO?pid=Api&P=0&h=180",
    text: "주거지역과 업무지역 집중 홍보"
  },
  5: {
    title: "★ 인물 · 스타 인증샷 포인트 ★",
    image: "https://i.ytimg.com/vi/ah3ckNtTc7A/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AGICIAC0AWKAgwIABABGE8gWyhlMA8=&rs=AOn4CLAyJ36evUFrrvYRPFldNPYJonKUzA",
    text: "3일, 7일, 15일"
  },
  6: {
    title: "★ 핫플! 타임싱크! ★",
    image: "https://tse1.mm.bing.net/th/id/OIP.VsuUx9zNjmxVbh0-eW4xXAHaE7?pid=Api&P=0&h=180",
    text: "문화・예술・축제・관광"
  },
  7: {
    title: "★ 패키지 특가! ★",
    image: "https://cdn.bizwnews.com/news/photo/202508/109284_119440_2926.png",
    text: "합리적인 비용 전광판 패키지"
  }
};

export default function LeafletMap() {
  const mapRef = useRef<L.Map | null>(null);
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Entire");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentLang, setCurrentLang] = useState<"en" | "kr">("kr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState(1);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState<any[]>([]);
  const allMarkersRef = useRef<L.Marker[]>([]);
  const visibleMarkersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([37.5665, 126.9780], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const markerCluster = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          return L.divIcon({
            html: `<div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">${cluster.getChildCount()}</div>`,
            className: 'marker-cluster',
            iconSize: L.point(40, 40)
          });
        }
      });
      map.addLayer(markerCluster);

      mapRef.current = map;
      markerClusterRef.current = markerCluster;

      // Clear any existing markers
      allMarkersRef.current = [];
      
      // Create markers
      locations.forEach(loc => {
        const popupContent = `
          <div class="flex items-start gap-2">
            <img src="${loc.img}" alt="${loc.title}" class="w-20 h-16 object-cover rounded" />
            <div>
              <h4 class="font-semibold">${loc.title}</h4>
              <p class="text-sm">${loc.desc}</p>
            </div>
          </div>
        `;
        const customIcon = L.icon({
          iconUrl: loc.img,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50],
          className: 'rounded-full border border-white shadow-lg'
        });
        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon } as any).bindPopup(popupContent);
        (marker as any).options.data = loc;
        allMarkersRef.current.push(marker);
        markerCluster.addLayer(marker);
      });

      visibleMarkersRef.current = [...allMarkersRef.current];

      // Event listeners
      markerCluster.on('animationend', renderSidebar);
      map.on('zoomend', () => setTimeout(renderSidebar, 100));
      markerCluster.on('clusterclick', () => setTimeout(renderSidebar, 100));

      setTimeout(renderSidebar, 100);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerClusterRef.current = null;
      }
      allMarkersRef.current = [];
      visibleMarkersRef.current = [];
    };
  }, []);

  const renderSidebar = () => {
    if (!markerClusterRef.current) return;

    const clusterGroups = new Map();

    visibleMarkersRef.current.forEach(marker => {
      const parent = markerClusterRef.current!.getVisibleParent(marker);
      if (!parent) return;
      const key = (parent as any)._leaflet_id;
      if (!clusterGroups.has(key)) clusterGroups.set(key, []);
      clusterGroups.get(key).push(marker);
    });

    const items: any[] = [];
    clusterGroups.forEach(group => {
      if (group.length === 1) {
        const loc = (group[0] as any).options.data;
        items.push({
          type: 'single',
          location: loc,
          markers: group
        });
      } else {
        items.push({
          type: 'cluster',
          locations: group.map((m: any) => m.options.data),
          markers: group
        });
      }
    });

    setSidebarItems(items);
  };

  const applyFilters = () => {
    const keyword = searchKeyword.toLowerCase();

    visibleMarkersRef.current = allMarkersRef.current.filter(marker => {
      const loc = (marker as any).options.data;
      const matchSearch = loc.title.toLowerCase().includes(keyword) || loc.desc.toLowerCase().includes(keyword);
      let matchCategory = true;
      if (selectedCategory !== "Entire" && selectedCategory !== "전체") {
        matchCategory = loc.category.includes(selectedCategory);
      }
      return matchSearch && matchCategory;
    });

    if (markerClusterRef.current) {
      markerClusterRef.current.clearLayers();
      visibleMarkersRef.current.forEach(m => markerClusterRef.current!.addLayer(m));
    }

    setTimeout(renderSidebar, 50);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchKeyword]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSidebarItemClick = (item: any) => {
    if (!mapRef.current) return;

    if (item.type === 'single') {
      const loc = item.location;
      mapRef.current.setView([loc.lat, loc.lng], 14);
      item.markers[0].openPopup();
    } else {
      const featureGroup = L.featureGroup(item.markers);
      mapRef.current.fitBounds(featureGroup.getBounds());
    }
  };

  const loadModalContent = (id: number) => {
    setActiveModalContent(id);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="h-[60px] flex items-center px-4 bg-blue-900 text-white py-2 border-b border-b-gray">
        <div className="flex gap-2 justify-between w-full">
          <div className="flex gap-2">
            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              Logo
            </div>
            <div className="flex items-center overflow-hidden w-96">
              <div className="animate-marquee whitespace-nowrap">
                기업광고, 지자체광고, 연예인광고, 지역축제광고, 브랜드런칭광고, 생일축하
                1533-1975로 문의 주시면, 예산에 맞춰 패키지로 제안드립니다. 1533-1975
              </div>
            </div>

            {/* Region Dropdown */}
            <div className="relative inline-block text-left">
              <div
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                지역 바로가기
                <span className={`ml-1 transition-transform ${isRegionDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>

              {isRegionDropdownOpen && (
                <div className="absolute right-0 z-[9999] mt-2 w-[420px] rounded-md border border-gray-200 bg-white shadow-lg">
                  <div className="grid grid-cols-3 gap-4 p-4 text-sm">
                    <div>
                      <p className="mb-2 font-semibold text-gray-800">전국/수도권</p>
                      <ul className="space-y-1">
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">전국</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">수도권</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-gray-800">서울시</p>
                      <ul className="space-y-1">
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">서울시(전체)</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">강북</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">강남</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">강동</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">강서</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-gray-800">광역시도</p>
                      <ul className="space-y-1">
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">세종시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">대전시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">광주시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">대구시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">부산시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">울산시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">창원시</li>
                        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 transition text-gray-700">제주도</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Open Modal
            </div>

            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              <a href="https://www.youtube.com/channel/UCxXNbNumZkcpjIGzUaOnfnQ" target="_blank" rel="noopener noreferrer">
                Theme
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              <a href="https://www.k-goplay.com/assets/public/doc/%EA%B4%91%EA%B3%A0%ED%94%8C%EB%A0%88%EC%9D%B4-%EA%B4%91%EA%B3%A0%EB%A7%A4%EC%B2%B4%EC%86%8C%EA%B0%9C%EC%84%9C.pdf" target="_blank" rel="noopener noreferrer">
                User Guide
              </a>
            </div>
            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              Dropdown 2
            </div>
            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              Login
            </div>
            <div className="flex h-full items-center justify-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 transition">
              Join the member
            </div>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <header className="h-[60px] flex items-center px-4 bg-blue-900 text-white border-b-4 py-2 border-b-gray gap-2">
        <div className="font-bold">Ad Mart</div>
        <input
          id="searchInput"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-26 ml-4 flex-1 px-3 py-2 rounded-full text-black"
          placeholder={translations[currentLang].searchPlaceholder}
        />

        <div className="flex gap-2">
          {translations[currentLang].categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-1 rounded-full ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ml-4 flex items-center gap-2">
          <div
            onClick={() => setCurrentLang('en')}
            className="p-1 rounded bg-white hover:bg-gray-200 transition cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
              alt="English"
              className="h-5 w-5 rounded"
            />
          </div>
          <div
            onClick={() => setCurrentLang('kr')}
            className="p-1 rounded bg-white hover:bg-gray-200 transition cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg"
              alt="Korean"
              className="h-5 w-5 rounded"
            />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 h-[calc(100vh-120px)]">
        <aside className="w-[360px] border-r border-gray-200 overflow-y-auto">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSidebarItemClick(item)}
              className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition flex flex-col gap-2"
            >
              {item.type === 'single' ? (
                <>
                  <div className="overflow-hidden rounded">
                    <img
                      src={item.location.img}
                      alt={item.location.title}
                      className="w-full h-42 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.location.title}</h4>
                    <p className="text-sm text-gray-600">{item.location.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2 overflow-x-auto">
                    {item.locations.map((loc: Location, i: number) => (
                      <img
                        key={i}
                        src={loc.img}
                        alt={loc.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.locations.length} locations</h4>
                    <p className="text-sm text-gray-600">
                      {item.locations.map((l: Location) => l.title).join(', ')}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </aside>
        <div id="map" className="flex-1"></div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl overflow-hidden relative flex flex-col md:flex-row">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
            >
              ✕
            </button>

            {/* Left Sidebar */}
            <div className="md:w-1/3 bg-gray-50 p-4 flex flex-col gap-2 overflow-y-auto">
              <h3 className="font-semibold text-lg mb-2">카테고리 선택</h3>

              {Object.keys(modalData).map((key) => (
                <button
                  key={key}
                  onClick={() => loadModalContent(Number(key))}
                  className={`px-3 py-1 rounded text-left hover:bg-gray-200 transition ${
                    activeModalContent === Number(key) ? 'bg-gray-200' : ''
                  }`}
                >
                  {(modalData as any)[key].title}
                </button>
              ))}
            </div>

            {/* Right Content */}
            <div className="md:w-2/3 p-4 flex flex-col justify-center items-center">
              <img
                src={(modalData as any)[activeModalContent].image}
                alt={translations[currentLang].modalTitles[activeModalContent as keyof typeof translations.kr.modalTitles]}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                {translations[currentLang].modalTitles[activeModalContent as keyof typeof translations.kr.modalTitles]}
              </h2>
              <p className="text-gray-600">
                {translations[currentLang].modalTexts[activeModalContent as keyof typeof translations.kr.modalTexts]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
