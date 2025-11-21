import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group bg-white border-2 border-border hover:border-primary overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardContent className="p-0">
        <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl opacity-50">🎨</span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Featured badge */}
          {collection.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ⭐ Destacado
              </span>
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
              {collection.name}
            </h3>
          </div>
        </div>
        
        <div className="p-6">
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full font-bold rounded-full group/btn" 
            onClick={() => onViewProducts(collection.id)}
          >
            <span>Ver Talleres</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}