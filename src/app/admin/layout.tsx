
'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, Newspaper, Briefcase, Settings, PlusCircle, LayoutList, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading, auth } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">Loading...</div>;
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/login');
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Sidebar className='bg-white dark:bg-gray-800 border-r dark:border-gray-700'>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/admin" className='w-full'>
                    <Button variant='ghost' className="w-full justify-start gap-2">
                      <Home />
                      <span>Dashboard</span>
                    </Button>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <Link href="/admin/leads" className='w-full'>
                    <Button variant='ghost' className="w-full justify-start gap-2">
                      <Mail />
                      <span>Leads</span>
                    </Button>
                </Link>
              </SidebarMenuItem>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="posts" className="border-none">
                  <AccordionTrigger className="hover:no-underline [&[data-state=open]>svg]:rotate-180">
                     <div className="flex items-center gap-2 w-full p-2">
                        <Newspaper />
                        <span>Posts</span>
                      </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <SidebarMenu className='ml-4'>
                       <SidebarMenuItem>
                        <Link href="/admin/posts" className='w-full'>
                          <Button variant='ghost' className="w-full justify-start gap-2">
                            <LayoutList />
                            <span>All Posts</span>
                           </Button>
                        </Link>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <Link href="/admin/posts/new" className='w-full'>
                           <Button variant='ghost' className="w-full justify-start gap-2">
                            <PlusCircle />
                            <span>Add New</span>
                           </Button>
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="portfolio" className="border-none">
                   <AccordionTrigger className="hover:no-underline [&[data-state=open]>svg]:rotate-180">
                     <div className="flex items-center gap-2 w-full p-2">
                        <Briefcase />
                        <span>Portfolio</span>
                      </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <SidebarMenu className='ml-4'>
                       <SidebarMenuItem>
                         <Link href="/admin/portfolio" className='w-full'>
                           <Button variant='ghost' className="w-full justify-start gap-2">
                             <LayoutList />
                            <span>All Items</span>
                           </Button>
                        </Link>
                      </SidebarMenuItem>
                       <SidebarMenuItem>
                        <Link href="/admin/portfolio/new" className='w-full'>
                           <Button variant='ghost' className="w-full justify-start gap-2">
                            <PlusCircle />
                            <span>Add New</span>
                           </Button>
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <SidebarMenuItem>
                <Link href="/admin/settings" className='w-full'>
                   <Button variant='ghost' className="w-full justify-start gap-2">
                    <Settings />
                    <span>Settings</span>
                   </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
           <header className="flex h-14 items-center gap-4 bg-white dark:bg-gray-800 px-4 lg:h-[60px] lg:px-6 border-b dark:border-gray-700">
            <SidebarTrigger />
            <div className='w-full flex-1'>
              {/* Can add a search bar here later */}
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
          </header>
          <main className="flex-1 p-4 lg:p-6">
             <div className="container mx-auto px-4 sm:px-8">
                {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
