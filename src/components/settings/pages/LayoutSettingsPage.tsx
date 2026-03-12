import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/shared/Settings/SettingsContext'

const AppearanceSettingsPage = () => {
  const { settings, setSettings } = useSettings()

  return (
    <FieldGroup className='p-12'>
      <FieldSet>
        <FieldLegend>Contents</FieldLegend>
        <FieldGroup>
          <Field orientation={'horizontal'}>
            <FieldLabel>Clock</FieldLabel>
            <Switch
              checked={settings.layout.contents.clock}
              onCheckedChange={(checked) => {
                setSettings({
                  ...settings,
                  layout: {
                    ...settings.layout,
                    contents: {
                      ...settings.layout.contents,
                      clock: checked,
                    },
                  },
                })
              }}
            />
          </Field>
          <Field orientation={'horizontal'}>
            <FieldLabel>Shortcuts</FieldLabel>
            <Switch
              checked={settings.layout.contents.shortcuts}
              onCheckedChange={(checked) => {
                setSettings({
                  ...settings,
                  layout: {
                    ...settings.layout,
                    contents: {
                      ...settings.layout.contents,
                      shortcuts: checked,
                    },
                  },
                })
              }}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}

export default AppearanceSettingsPage
