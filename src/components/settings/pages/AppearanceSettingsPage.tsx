import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { useSettings } from '@/shared/Settings/SettingsContext'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const AppearanceSettingsPage = () => {
  const { settings, setSettings } = useSettings()

  return (
    <FieldGroup className='p-12'>
      <FieldSet>
        <FieldLegend>Theme</FieldLegend>
        <FieldGroup>
          <Field orientation={'horizontal'}>
            <FieldLabel htmlFor='input_darkMode'>Mode</FieldLabel>
            <ToggleGroup
              variant={'outline'}
              value={[settings.theme.mode]}
              onValueChange={(value) => {
                if (!value) return
                setSettings({
                  ...settings,
                  theme: {
                    ...settings.theme,
                    mode: value[0] as 'dark' | 'light' | 'system',
                  },
                })
              }}
            >
              <ToggleGroupItem value='dark' aria-label='toggle dark'>
                Dark
              </ToggleGroupItem>
              <ToggleGroupItem value='system' aria-label='toggle system'>
                System
              </ToggleGroupItem>
              <ToggleGroupItem value='light' aria-label='toggle light'>
                Light
              </ToggleGroupItem>
            </ToggleGroup>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}

export default AppearanceSettingsPage
