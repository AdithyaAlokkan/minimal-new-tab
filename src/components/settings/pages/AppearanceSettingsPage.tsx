import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { useSettings } from '@/shared/Settings/SettingsContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AppearanceSettingsPage = () => {
  const { settings, setSettings } = useSettings()

  const itemsThemeMode = [
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
  ]

  return (
    <FieldGroup className='p-12'>
      <FieldSet>
        <FieldLegend>Theme</FieldLegend>
        <FieldGroup>
          <Field orientation={'horizontal'}>
            <FieldLabel htmlFor='input_darkMode'>Mode</FieldLabel>
            <Select
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
    </FieldGroup>
  )
}

export default AppearanceSettingsPage
