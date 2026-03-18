import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
  FieldSeparator,
} from '@/components/ui/field'
import { useSettings } from '@/shared/settings/SettingsContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@base-ui/react'
import { Button } from '@/components/ui/button'
import { SettingsDefault } from '@/shared/settings/settings.default'

const AppearanceSettingsPage = () => {
  const { settings, setSettings } = useSettings()

  const itemsThemeMode = [
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Custom', value: 'custom' },
  ]

  return (
    <FieldGroup className='p-12'>
      <FieldSet>
        <FieldLegend>Theme</FieldLegend>
        <FieldGroup>
          <Field orientation={'horizontal'}>
            <FieldLabel htmlFor='input_darkMode'>Mode</FieldLabel>
            <Select
              id='input_darkMode'
              items={itemsThemeMode}
              value={settings.theme.mode}
              onValueChange={(value) => {
                if (!value) return
                setSettings({
                  ...settings,
                  theme: { ...settings.theme, mode: value },
                })
              }}
            >
              <SelectTrigger className='w-24'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={'w-25 min-w-25'}>
                <SelectGroup>
                  {itemsThemeMode.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
      {settings.theme.mode === 'custom' && (
        <>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Color scheme</FieldLegend>
            <FieldGroup>
              <Field orientation={'horizontal'}>
                <FieldLabel>Background</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.background}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          background: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Foreground</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.foreground}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          foreground: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Card</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.card}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          card: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Primary</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.primary}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          primary: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Secondary</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.secondary}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          secondary: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Accent</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.accent}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          accent: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation={'horizontal'}>
                <FieldLabel>Destructive</FieldLabel>
                <Input
                  type='color'
                  value={settings.theme.color.destructive}
                  onValueChange={(value) => {
                    if (!value) return
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: {
                          ...settings.theme.color,
                          destructive: value,
                        },
                      },
                    })
                  }}
                />
              </Field>
              <Field orientation='horizontal'>
                <Button
                  className='ml-auto w-15'
                  onClick={() =>
                    setSettings({
                      ...settings,
                      theme: {
                        ...settings.theme,
                        color: SettingsDefault.theme.color,
                      },
                    })
                  }
                >
                  Reset
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </>
      )}
    </FieldGroup>
  )
}

export default AppearanceSettingsPage
