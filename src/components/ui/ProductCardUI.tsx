import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { Clock, Calendar } from "lucide-react"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Diseño moderno y colorido para tarjetas de talleres creativos
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group bg-white border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span className="text-6xl">🎨</span>
                  </div>
                )}

                {/* Badges con colores vibrantes */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>

            <div className="p-5">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {/* Info del taller */}
              <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>3 horas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Lun-Vie</span>
                </div>
              </div>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-2">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-semibold text-foreground mb-1.5">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-7 w-7 rounded-full border-2 transition-all ${
                                  isSelected 
                                    ? 'border-primary ring-2 ring-primary/20 scale-110' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                                  : 'border-border bg-background text-foreground hover:border-primary/50'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">MXN por persona</span>
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {logic.inStock ? 'Reservar' : 'Agotado'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}