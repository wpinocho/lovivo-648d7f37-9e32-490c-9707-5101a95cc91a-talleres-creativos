import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail, Sparkles } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Newsletter moderna y colorida para talleres creativos
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="py-20 bg-gradient-to-br from-muted/50 via-background to-muted/30 border-y-2 border-border relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-stripes opacity-10"></div>
          
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-full p-4 shadow-lg">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  ¡Gracias por Suscribirte! 🎉
                </h3>
                <p className="text-lg text-muted-foreground">
                  Recibirás noticias sobre nuevos talleres, promociones especiales y mucho más.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      Únete a Nuestra Comunidad
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    Recibe Noticias y Ofertas Especiales
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Sé el primero en enterarte de nuevos talleres, descuentos exclusivos 
                    y tips creativos directo en tu inbox.
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="tu@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12 text-base border-2 focus:border-primary rounded-full px-6"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    size="lg"
                    className="sm:w-auto h-12 px-8 font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    {logic.isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-full px-4 py-2 inline-block">
                    {logic.error}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  No spam, solo contenido creativo. Puedes darte de baja cuando quieras.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};