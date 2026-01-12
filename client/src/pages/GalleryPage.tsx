import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'rooms' | 'dining' | 'spa' | 'events' | 'amenities';
  title?: string;
}

const galleryImages: GalleryImage[] = [
  // Rooms
  {
    id: 'room-1',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Deluxe Room',
    category: 'rooms',
    title: 'Deluxe Room',
  },
  {
    id: 'room-2',
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Executive Suite',
    category: 'rooms',
    title: 'Executive Suite',
  },
  {
    id: 'room-3',
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Junior Suite',
    category: 'rooms',
    title: 'Junior Suite',
  },
  {
    id: 'room-4',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Grand Suite',
    category: 'rooms',
    title: 'Grand Suite',
  },
  {
    id: 'room-5',
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Presidential Suite',
    category: 'rooms',
    title: 'Presidential Suite',
  },
  {
    id: 'room-6',
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Penthouse Suite',
    category: 'rooms',
    title: 'Penthouse Suite',
  },
  // Dining
  {
    id: 'dining-1',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Fine Dining Restaurant',
    category: 'dining',
    title: 'Fine Dining Restaurant',
  },
  {
    id: 'dining-2',
    src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant Dining Room',
    category: 'dining',
    title: 'Elegant Dining Room',
  },
  {
    id: 'dining-3',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Outdoor Terrace',
    category: 'dining',
    title: 'Outdoor Terrace Dining',
  },
  {
    id: 'dining-4',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Wine Bar',
    category: 'dining',
    title: 'Wine Bar & Lounge',
  },
  // Spa
  {
    id: 'spa-1',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Spa Treatment Room',
    category: 'spa',
    title: 'Spa Treatment Room',
  },
  {
    id: 'spa-2',
    src: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Relaxation Area',
    category: 'spa',
    title: 'Relaxation Area',
  },
  {
    id: 'spa-3',
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Spa Pool',
    category: 'spa',
    title: 'Spa Pool & Jacuzzi',
  },
  {
    id: 'spa-4',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Sauna',
    category: 'spa',
    title: 'Sauna & Steam Room',
  },
  // Events
  {
    id: 'event-1',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Wedding Venue',
    category: 'events',
    title: 'Wedding Venue',
  },
  {
    id: 'event-2',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Conference Hall',
    category: 'events',
    title: 'Conference Hall',
  },
  {
    id: 'event-3',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Banquet Hall',
    category: 'events',
    title: 'Grand Banquet Hall',
  },
  {
    id: 'event-4',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Outdoor Event Space',
    category: 'events',
    title: 'Outdoor Event Space',
  },
  // Amenities
  {
    id: 'amenity-1',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Swimming Pool',
    category: 'amenities',
    title: 'Infinity Pool',
  },
  {
    id: 'amenity-2',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Fitness Center',
    category: 'amenities',
    title: 'State-of-the-Art Fitness Center',
  },
  {
    id: 'amenity-3',
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Lobby',
    category: 'amenities',
    title: 'Grand Lobby',
  },
];

const categories: Array<{ id: GalleryImage['category']; label: string }> = [
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'dining', label: 'Dining' },
  { id: 'spa', label: 'Spa & Wellness' },
  { id: 'events', label: 'Events & Meetings' },
  { id: 'amenities', label: 'Amenities' },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryImage['category'] | 'all'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    } else {
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Gallery
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Discover the elegance and sophistication of SK+ Hotel through our curated collection
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-sm font-medium transition-all duration-200 uppercase tracking-wide ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-sm font-medium transition-all duration-200 uppercase tracking-wide ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
              onClick={() => openLightbox(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {image.title && (
                    <h3 className="font-display font-bold text-lg mb-1">{image.title}</h3>
                  )}
                  <p className="text-sm text-neutral-200 capitalize">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-neutral-900/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors duration-200 z-10 bg-neutral-900/50 rounded-full p-2"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 text-white hover:text-primary-400 transition-colors duration-200 z-10 bg-neutral-900/50 rounded-full p-3"
                aria-label="Previous"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 text-white hover:text-primary-400 transition-colors duration-200 z-10 bg-neutral-900/50 rounded-full p-3"
                aria-label="Next"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
              {selectedImage.title && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-neutral-300 capitalize">{selectedImage.category}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
