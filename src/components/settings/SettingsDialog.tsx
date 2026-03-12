import { useState } from 'react'

import AppearanceSettingsPage from './pages/AppearanceSettingsPage'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Palette, Settings } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const nav = [
  {
    key: 'Appearance',
    icon: <Palette />,
    page: <AppearanceSettingsPage />,
  },
]

const SettingsDialog = () => {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(nav[0].key)
  const activePage = nav.find((n) => n.key === activeKey)?.page

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={'outline'}
            size='icon'
            className={
              'bg-background/30 text-muted-foreground fixed right-0 bottom-0 m-5 rounded-full backdrop-blur-sm'
            }
          >
            <Settings />
          </Button>
        }
      />
      <DialogContent className='max-h-[500px] min-w-100 overflow-hidden p-0 md:max-w-[700px] lg:max-w-[800px]'>
        <DialogTitle className='sr-only'>Settings</DialogTitle>
        <DialogDescription className='sr-only'>
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider
          className='items-start'
          style={
            {
              '--sidebar-width': '12rem',
              '--sidebar-width-mobile': '16rem',
            } as React.CSSProperties
          }
        >
          <Sidebar collapsible='none' className='hidden md:flex'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {nav.map((item) => (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton
                          isActive={item.key === activeKey}
                          onClick={() => setActiveKey(item.key)}
                        >
                          {item.icon}
                          <span>{item.key}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <ScrollArea className='flex h-[500px] flex-1 flex-col overflow-hidden'>
            {activePage}
          </ScrollArea>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
