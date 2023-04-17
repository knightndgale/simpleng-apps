/* eslint-disable @next/next/no-img-element */
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/solid";
import { TRPCError } from "@trpc/server";
import { useRef, useState } from "react";
import { facerAiDummyImage } from "~/constants/dummy";
import { imageUrlSchema } from "~/schema/clarifai.z";
import { api } from "~/utils/api";

const FaceAI: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dismissImage = () => {
    setImageUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutate: clarifaiMutate } = api.clarifai.predict.useMutation({
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      if (!(data instanceof TRPCError)) console.log(data);
    },
  });

  const handleOnChangeImageUrl = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = imageUrlSchema.safeParse(event.target.value);

    if (!url.success) return dismissImage();
    clarifaiMutate({ imageUrl: url.data });
    setImageUrl(event.target.value);
  };

  return (
    <div className="grid min-h-fit grid-cols-4 gap-2">
      <div className="col-span-1  pt-5">
        <div className="relative">
          <input
            ref={fileInputRef}
            type="text"
            onChange={handleOnChangeImageUrl}
            placeholder="Add image url"
            className="w-full cursor-pointer truncate rounded-md border border-gray-300 py-2 pl-10 pr-2 text-sm text-gray-500 file:hidden focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        <div className="divider"></div>
      </div>

      <div className="col-span-3 flex flex-wrap  gap-3 p-5  ">
        <div className="relative">
          {/* <div className="absolute right-20 top-20  box-border h-32 w-32 border-4 border-blue-700 p-4 "></div> */}

          <img
            loading="lazy"
            src={imageUrl ?? facerAiDummyImage}
            className=" max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            alt={fileInputRef.current?.value || ""}
          />
          {imageUrl && fileInputRef.current?.value && (
            <button
              className="absolute right-0 top-0 m-5 rounded-full bg-primary p-1 text-white transition ease-in-out hover:-translate-y-1  hover:scale-105"
              onClick={() => dismissImage()}
            >
              <XMarkIcon className="h-6 w-6 " />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceAI;
