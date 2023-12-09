import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import Navbar from "~/components/Navbar";
import { Textbox } from "~/components/EditCard";
import Meta from "~/components/Meta";

export default function CreateCard() {
  type CardDataValues = {
    title: string;
    description: string;
    birthday: string;
    showAge: boolean;
  };

  const { register, handleSubmit } = useForm<CardDataValues>();

  const { mutate } = api.cards.create.useMutation({
    onSuccess: (data) => (location.href = `/c/${data.id}`),
  });

  return (
    <>
      <Meta title="Create a card | bday.quest (beta)" />

      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form
            className="card-body"
            onSubmit={handleSubmit((data) => {
              data.birthday = dayjs(data.birthday).toISOString();
              mutate(data);
            })}
          >
            <Textbox title="Title" type="title" register={register} required />
            <Textbox
              title="Description"
              type="description"
              register={register}
              required
            />
            <Textbox
              title={
                <>
                  Birthday{" "}
                  <span className="text-xs">
                    (birth year is irrelevant but nice)
                  </span>
                </>
              }
              type="birthday"
              inputType="date"
              register={register}
              required
            />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Show age?</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  {...register("showAge")}
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
