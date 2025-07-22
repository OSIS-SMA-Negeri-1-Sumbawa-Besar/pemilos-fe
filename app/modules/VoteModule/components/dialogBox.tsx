import { DialogContent } from "@radix-ui/react-dialog"
import { Children, useState } from "react"
import { Button } from "~/components/ui/button"
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"

interface voteConfirmation {
  children: React.ReactNode
  openDialog: boolean,
  setOpenDialog: (open: boolean) => void
  disable?: boolean
  paslonId: number
}

export const VoteDialog: React.FC<voteConfirmation> = ({
  children,
  openDialog,
  setOpenDialog,
  disable = false,
  paslonId
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={openDialog && !disable}
      onOpenChange={(open) => {
        setOpenDialog(open)
      }}
    >
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent className="min-w-[300px] p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg outline">
        <DialogHeader>
          <DialogTitle>
            Apakah Kamu Yakin Memilih Paslon Nomor {paslonId}?
          </DialogTitle>
          <DialogDescription>
            Pilihan kamu tidak dapat di ubah!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse gap-2 mt-10">
          <DialogClose
          >
            <Button variant={'outline'} className="w-full cursor-pointer">
              Tidak Yakin
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => {
                setOpen(true)
                console.log(paslonId)
              }}
              variant={'default'}
              className="w-full cursor-pointer"
            >
              Yakin
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}