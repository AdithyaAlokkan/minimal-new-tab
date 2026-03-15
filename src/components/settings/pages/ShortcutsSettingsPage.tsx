import { Card, CardContent } from '@/components/ui/card'
import { FieldGroup, FieldLabel, Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useShortcuts } from '@/shared/shortcuts/ShortcutsContext'
import type { ShortcutType } from '@/shared/shortcuts/shortcut.types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const ShortcutsSettingsPage = () => {
  const { shortcuts, setShortcuts } = useShortcuts()

  return (
    <div className='grid auto-rows-auto grid-cols-[repeat(auto-fit,calc(var(--spacing)*70))] gap-x-5 gap-y-5 p-5 pt-15'>
      {shortcuts &&
        shortcuts.length > 0 &&
        shortcuts.map((shortcut: ShortcutType, index: number) => (
          <Card size='sm' className='bg-background w-70' key={index}>
            <CardContent>
              <FieldGroup className='gap-y-2'>
                <div className='flex justify-between gap-x-5'>
                  <Field>
                    <FieldLabel htmlFor={`${shortcut.id}_name_input`}>
                      Name
                    </FieldLabel>
                    <Input
                      id={`${shortcut.id}_name_input`}
                      value={shortcut.name}
                      onChange={(e) => {
                        const newName = e.target.value
                        setShortcuts((prev) =>
                          prev.map((s) =>
                            s.id === shortcut.id ? { ...s, name: newName } : s,
                          ),
                        )
                      }}
                    />
                  </Field>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button variant={'shortcut'} size={'shortcut'}>
                          <img
                            src={shortcut.icon}
                            alt={`${shortcut.name} icon`}
                            className='pointer-events-none size-9 object-contain'
                          />
                        </Button>
                      }
                    />
                    <PopoverContent align='start'>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor={`${shortcut.id}_icon_input`}>
                            Icon URL
                          </FieldLabel>
                          <Input
                            id={`${shortcut.id}_icon_input`}
                            value={shortcut.icon}
                            onChange={(e) => {
                              const newIcon = e.target.value
                              setShortcuts((prev) =>
                                prev.map((s) =>
                                  s.id === shortcut.id
                                    ? { ...s, icon: newIcon }
                                    : s,
                                ),
                              )
                            }}
                          />
                        </Field>
                      </FieldGroup>
                    </PopoverContent>
                  </Popover>
                </div>
                <Field>
                  <FieldLabel htmlFor={`${shortcut.id}_url_input`}>
                    URL
                  </FieldLabel>
                  <Input
                    id={`${shortcut.id}_url_input`}
                    value={shortcut.url}
                    onChange={(e) => {
                      const newUrl = e.target.value
                      setShortcuts((prev) =>
                        prev.map((s) =>
                          s.id === shortcut.id ? { ...s, name: newUrl } : s,
                        ),
                      )
                    }}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default ShortcutsSettingsPage
