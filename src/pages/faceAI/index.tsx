/* eslint-disable @next/next/no-img-element */
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import FaceAIBox from "~/components/faceaiBox";
import { defaultImage } from "~/constants/clarifai";
import { imageUrlSchema } from "~/schema/clarifai.z";
import { type ClarifaiInterface, type Region } from "~/types/clarifai.types";
import { api } from "~/utils/api";

const FaceAI: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [boxRegions, setBoxRegions] = useState<Region[]>([]);

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [faceNumber, setFaceNumber] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dismissImage = () => {
    setImageUrl(undefined);
    setBoxRegions([]);
    setFaceNumber(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutate: clarifaiMutate } = api.clarifai.predict.useMutation({
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data: ClarifaiInterface) => {
      if (data.status.code !== 10000) {
        return console.error(data.status.description);
      }
      const outputs = data.outputs[0];
      if (
        !outputs ||
        !outputs.data.regions.length ||
        !outputs.data.regions[0]
      ) {
        dismissImage();
        return;
      }
      setBoxRegions(outputs.data.regions);
      setFaceNumber(outputs.data.regions.length);
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
            placeholder="Paste image url"
            className="w-full cursor-pointer truncate rounded-md border border-gray-300 py-2 pl-10 pr-2 text-sm text-gray-500 file:hidden focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        <div className="divider"></div>
        {faceNumber !== 0 && (
          <div className="flex">
            <article className="prose">
              <h3>Faces Detected: {faceNumber}</h3>
            </article>
          </div>
        )}
      </div>

      <div className="col-span-3 flex flex-wrap  gap-3 p-5  ">
        <div className="relative">
          <img
            ref={imageRef}
            loading="lazy"
            src={imageUrl ?? defaultImage}
            className=" max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            alt={fileInputRef.current?.value || ""}
          />
          {boxRegions.length > 0 &&
            boxRegions.map((boxes: Region, index: number) => (
              <FaceAIBox
                key={`boxes-${index}`}
                boundigBox={boxes.region_info.bounding_box}
                imageHeight={imageRef.current?.height || 0}
                imageWidth={imageRef.current?.width || 0}
              />
            ))}
          {imageUrl && fileInputRef.current?.value && (
            <button
              className="absolute right-0 top-0 m-3 rounded-full bg-primary p-1 text-white transition ease-in-out hover:-translate-y-1  hover:scale-105"
              onClick={() => dismissImage()}
            >
              <XMarkIcon className="h-4 w-4 " />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceAI;
