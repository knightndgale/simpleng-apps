/* eslint-disable @next/next/no-img-element */
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import FaceAIBox from "~/components/faceaiBox";
import Content from "~/components/layout/Content";
import MainContainer from "~/components/layout/MainContainer";
import SideContent from "~/components/layout/SideContent";
import { defaultImage } from "~/constants/clarifai";
import { imageUrlSchema } from "~/schema/clarifai.z";
import { type ClarifaiInterface, type Region } from "~/types/clarifai.types";
import { api } from "~/utils/api";

const FaceAI: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [boxRegions, setBoxRegions] = useState<Region[]>([]);

  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);
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
    <MainContainer>
      <SideContent>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="text"
            onChange={handleOnChangeImageUrl}
            placeholder="Paste image url"
            className="w-full cursor-pointer truncate rounded-md border border-gray-300 py-2 pl-10 pr-2 text-sm text-gray-500 file:hidden focus:border-primary-focus focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
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
      </SideContent>

      <Content>
        <div className="relative">
          <img
            ref={imageRef}
            loading="lazy"
            src={imageUrl ?? defaultImage}
            onError={() =>
              setImageUrl(
                "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?w=1800&t=st=1685178104~exp=1685178704~hmac=2e1f4c920ea571132e0017c579222484eabe8ab93f75e04b7da444d5d757399f"
              )
            }
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
      </Content>
    </MainContainer>
  );
};

export default FaceAI;
