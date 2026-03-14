import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import type { ShortcutType } from '@/components/shortcuts/ShortcutType'
import getIcon from '@/lib/getIcon'
import normalizeUrl from '@/lib/normalizeUrl'
import { Plus } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

interface NewShortcutDialogProps {
  shortcuts: ShortcutType[]
  onAddShortcut: (shortcut: ShortcutType) => void
}

const NewShortcutDialog: React.FC<NewShortcutDialogProps> = ({
  shortcuts,
  onAddShortcut,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const formSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty.'),
    url: z.string().min(1, 'URL cannot be empty.'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsFetching(true)
    if (
      shortcuts.find(
        (s: ShortcutType) => normalizeUrl(s.url) === normalizeUrl(data.url),
      )
    ) {
      form.setError('url', {
        type: 'manual',
        message: 'The app shortcut already exists.',
      })
      setIsFetching(false)
      return
    }

    const newShortcut: ShortcutType = {
      id: encodeURIComponent(data.url),
      name: data.name,
      url: data.url,
      icon: String(await getIcon(data.url)),
    }

    onAddShortcut(newShortcut)

    form.reset()
    setIsOpen(false)
    setIsFetching(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          render={
            <Button
              onClick={() => setIsOpen(true)}
              variant={'shortcut'}
              size={'shortcut'}
            >
              <Plus />
            </Button>
          }
        />
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>New Shortcut</DialogTitle>
          </DialogHeader>
          <form
            id='form-add-app-shortcut'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FieldGroup>
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor='form-input-name-add-app-shortcut'>
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-input-name-add-app-shortcut'
                      aria-invalid={fieldState.invalid}
                      placeholder='Name'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='url'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor='form-input-url-add-app-shortcut'>
                      URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-input-url-add-app-shortcut'
                      aria-invalid={fieldState.invalid}
                      placeholder='URL'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Button type='submit' form='form-add-app-shortcut'>
              {isFetching ? <Spinner /> : <Plus data-icon='inline-start' />}
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewShortcutDialog
