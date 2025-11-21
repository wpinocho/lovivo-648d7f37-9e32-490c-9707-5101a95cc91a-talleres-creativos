import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template colorido y moderno para talleres creativos
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 border-b-2 border-border bg-background/95 backdrop-blur-md ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-foreground hover:text-primary transition-colors">
              <BrandLogoLeft />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                Talleres
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4 text-white">
              <BrandLogoLeft />
            </div>
            <p className="text-white/80 leading-relaxed">
              Talleres creativos en Ciudad de México donde transformamos ideas en arte.
              Únete a nuestra comunidad creativa.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Enlaces</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-white/80 hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-white/80 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <a 
                href="#talleres" 
                className="block text-white/80 hover:text-white transition-colors"
              >
                Talleres
              </a>
            </div>
          </div>

          {/* Info & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Síguenos</h3>
            <SocialLinks />
            <div className="mt-6 space-y-2 text-white/80 text-sm">
              <p>📍 Ciudad de México</p>
              <p>🕐 Lun - Vie: 9am - 5pm</p>
              <p>💰 $2,000 MXN por taller</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm">
            &copy; 2024 Talleres Creativos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}