import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { useSettings } from '@/shared/Settings/SettingsContext'

const AppearanceSettingsPage = () => {
  const { settings, setSettings } = useSettings()

  return (
    <FieldGroup className='p-12'>
      {/* ---------- CLOCK ---------- */}
      <FieldGroup>
        <FieldLegend>Clock</FieldLegend>
        <Field orientation={'horizontal'}>
          <FieldLabel>Show / Hide</FieldLabel>
          <Switch
            checked={settings.layout.clock.showHide}
            onCheckedChange={(checked) => {
              setSettings({
                ...settings,
                layout: {
                  ...settings.layout,
                  clock: { ...settings.layout.clock, showHide: checked },
                },
              })
            }}
          />
        </Field>
        <Field orientation={'horizontal'}>
          <FieldLabel>Height</FieldLabel>
          <Slider
            min={0}
            max={100}
            step={1}
            value={settings.layout.clock.height}
            onValueChange={(value) => {
              setSettings({
                ...settings,
                layout: {
                  ...settings.layout,
                  clock: {
                    ...settings.layout.clock,
                    height: Array.isArray(value) ? value[0] : value,
                  },
                },
              })
            }}
            className={'data-horizontal:w-30'}
          />
          <span className='w-[2rem] text-right'>
            {settings.layout.clock.height}
          </span>
        </Field>
      </FieldGroup>
      <FieldSeparator />
      {/* ---------- SHORTCUTS ---------- */}
      <FieldGroup>
        <FieldLegend>Shortcuts</FieldLegend>
        <Field orientation={'horizontal'}>
          <FieldLabel>Show / Hide</FieldLabel>
          <Switch
            checked={settings.layout.shortcuts}
            onCheckedChange={(checked) => {
              setSettings({
                ...settings,
                layout: {
                  ...settings.layout,
                  shortcuts: checked,
                },
              })
            }}
          />
        </Field>
      </FieldGroup>
    </FieldGroup>
  )
}

export default AppearanceSettingsPage
