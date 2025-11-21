import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz moderna y colorida para talleres creativos en México
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section con gradiente y rayas */}
      <section className="relative overflow-hidden py-20 bg-gradient-creative">
        <div className="absolute inset-0 bg-stripes opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Talleres Creativos en Ciudad de México
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Crea Arte con<br />Tus Propias Manos
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow">
            Talleres de 3 horas donde aprenderás técnicas únicas de arte y diseño.
            Todos los materiales incluidos por $2,000 MXN.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">3 horas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="font-medium text-foreground">Lun - Vie, 9am - 5pm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="font-medium text-foreground">CDMX</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            onClick={() => {
              document.getElementById('talleres')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Talleres Disponibles
          </Button>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 border-2 border-primary/20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground">Materiales Incluidos</h3>
              <p className="text-muted-foreground">
                Todo lo que necesitas para crear tu obra, sin preocupaciones
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-secondary/20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground">Grupos Pequeños</h3>
              <p className="text-muted-foreground">
                Atención personalizada para un mejor aprendizaje
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-mint-50 to-blue-50 border-2 border-accent/20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground">Llévate tu Creación</h3>
              <p className="text-muted-foreground">
                Termina y lleva tu obra el mismo día del taller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Explora Nuestros Talleres
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cada taller es una experiencia única diseñada para despertar tu creatividad
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="talleres" className="py-16 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Talleres'}` 
                  : 'Todos los Talleres'
                }
              </h2>
              <p className="text-muted-foreground">
                Reserva tu lugar • $2,000 MXN por persona
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver Todos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl">
              <span className="text-6xl mb-4 block">🎨</span>
              <p className="text-xl text-muted-foreground mb-2">
                No hay talleres disponibles en este momento
              </p>
              <p className="text-sm text-muted-foreground">
                Revisa pronto para nuevas fechas
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-stripes opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Crear Algo Increíble?
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Reserva tu taller hoy y descubre el artista que llevas dentro.
            ¡Cupos limitados!
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            onClick={() => {
              document.getElementById('talleres')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Reservar Ahora
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};