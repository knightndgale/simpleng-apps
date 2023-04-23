import { env } from "~/env.mjs"


const requestOptions = (imageUrl: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Key ${env.CLARIFAI_TOKEN}`,
    },
    body: JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    }),
  };
};

export const defaultImage =
  "https://img.freepik.com/free-photo/people-collage-design_23-2148888277.jpg?w=1060&t=st=1681658477~exp=1681659077~hmac=d36ceb2273b00d1f381508750adc8e0e0e25ed68149591e20bf745a7f7598d37";

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


export default requestOptions