
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, Instagram, Linkedin } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { services } from '@/app/services/services-data';

const developmentServices = services.filter(s =>
  ['ui-ux-creative-design', 'app-development', 'software-development', 'graphic-design', 'ecommerce-solutions', 'cloud-and-devops', 'qa-and-test-automation', 'maintenance-and-support'].includes(s.slug)
).sort((a, b) => a.title.localeCompare(b.title));

const marketingServices = services.filter(s =>
  ['professional-content-writer', 'seo-and-analytics'].includes(s.slug)
).sort((a, b) => a.title.localeCompare(b.title));

const navLinks = [
  //{ href: '/portfolio', label: 'Portfolio' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-12">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [activeTab, setActiveTab] = useState('development');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="absolute top-0 w-full py-4 px-4 sm:px-6 lg:px-8 z-30">
      <div className="container mx-auto flex items-center justify-between">

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-secondary text-white border-none p-0">
              <SheetHeader className='sr-only'>
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
                <SheetDescription>A list of links to navigate the website.</SheetDescription>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <Link href="/" className="block">
                    <Image
                      src="/logo.png"
                      alt="Nexon Inc"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

                <div className="flex flex-col space-y-4 p-4 mt-8">
                  {[{ href: '/about', label: 'About' }, { href: '/services', label: 'Services' }, ...navLinks].map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg hover:text-primary">
                      {link.label}
                    </Link>
                  ))}

                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">

                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">

          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Nexon Inc"
                width={300}
                height={150}
                className="w-[300px] h-auto"
              />
            </Link>
          </div>

          {/* Sticky Navigation */}
          <div className="justify-self-center">
            <nav
              className={cn(
                "fixed left-1/2 -translate-x-1/2 top-4 z-50 transition-all duration-300",
                "flex items-center space-x-1 px-3 py-2 rounded-full",
                isScrolled
                  ? "bg-white/95 backdrop-blur-lg shadow-lg border border-gray-200"
                  : "bg-white/20 backdrop-blur-md"
              )}
            >
              <NavigationMenu>
                <NavigationMenuList>

                  {/* About */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/about"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isScrolled
                            ? 'text-gray-900 hover:text-primary hover:bg-primary/10'
                            : 'text-white hover:bg-primary/80'
                        )}
                      >
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Services */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        isScrolled
                          ? 'text-gray-900 hover:text-primary hover:bg-primary/10 data-[state=open]:bg-primary/10'
                          : 'text-white hover:bg-primary/80 data-[state=open]:bg-primary/80'
                      )}
                      onMouseEnter={() => setActiveTab('development')}
                    >
                      Services
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="grid grid-cols-3 w-[60rem] p-4">

                        {/* Tabs */}
                        <div className="col-span-1 flex flex-col gap-2 pr-4 border-r border-border">

                          <button
                            onMouseEnter={() => setActiveTab('development')}
                            className={cn(
                              "flex items-start gap-3 rounded-md p-3 text-left transition-colors",
                              activeTab === 'development' ? 'bg-muted' : 'hover:bg-muted/50'
                            )}
                          >
                            <div>
                              <h4 className="font-semibold text-foreground">Development</h4>
                              <p className="text-sm text-muted-foreground">
                                Creating digital experiences through coding, design, and UX.
                              </p>
                            </div>
                          </button>

                          <button
                            onMouseEnter={() => setActiveTab('marketing')}
                            className={cn(
                              "flex items-start gap-3 rounded-md p-3 text-left transition-colors",
                              activeTab === 'marketing' ? 'bg-muted' : 'hover:bg-muted/50'
                            )}
                          >
                            <div>
                              <h4 className="font-semibold text-foreground">Marketing</h4>
                              <p className="text-sm text-muted-foreground">
                                Promotion and growth through digital strategy.
                              </p>
                            </div>
                          </button>

                        </div>

                        {/* Services Grid */}
                        <ul className="col-span-2 grid w-full grid-cols-2 gap-3">
                          {activeTab === 'development' && (
                            developmentServices.map((service) => (
                              <ListItem
                                key={service.title}
                                title={service.title}
                                href={`/services/${service.slug}`}
                                icon={service.icon}
                              >
                                {service.shortDescription}
                              </ListItem>
                            ))
                          )}

                          {activeTab === 'marketing' && (
                            marketingServices.map((service) => (
                              <ListItem
                                key={service.title}
                                title={service.title}
                                href={`/services/${service.slug}`}
                                icon={service.icon}
                              >
                                {service.shortDescription}
                              </ListItem>
                            ))
                          )}
                        </ul>

                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Other Links */}
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            isScrolled
                              ? 'text-gray-900 hover:text-primary hover:bg-primary/10'
                              : 'text-white hover:bg-primary/80'
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="justify-self-end flex items-center space-x-2">

          </div>

        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Nexon Inc"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Spacer */}
        <div className="lg:hidden w-10 h-10"></div>

      </div>
    </header>
  );
}

