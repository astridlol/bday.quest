import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import type CardWish from "~/interfaces/CardWish";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { updateWish } from "~/server/actions/updateWish";

export const EditWishDialog = (props: {
  signature: CardWish;
  children: JSX.Element;
}) => {
  const clientFunction = async (formData: FormData) => {
    const newWish = formData.get("wish") as string;
    await updateWish(props.signature.id, newWish);
    toast("Wish has been updated.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit your wish</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your message below
          </AlertDialogDescription>
          <form className="my-12" action={clientFunction}>
            <section className="space-y-2">
              <Input
                placeholder={props.signature.text}
                className="py-2"
                name="wish"
              />
            </section>
            <AlertDialogFooter>
              <AlertDialogAction>
                <Button type="submit">Submit</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
